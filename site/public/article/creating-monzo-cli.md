<metadata-json>
{
    "id": "1h3P1Jlb6hqQCfWAIcEmDZ8pRzX",
    "title": "Creating Monzo CLI",
    "date": "2020-09-04T17:22:00.000Z",
    "category": "technology",
    "status": "default",
    "tags": [ "monzo", "typescript", "node", "fun" ] 
}
<metadata-json>
In order to keep better track of my money I decided to create a little cli which will allow me to extract useful information from monzo api. 

![demo](/img/monzo-cli-demo.gif)

## Authentication
In order to be able to authenticate with monzo I first had to log in to their [playground](https://developers.monzo.com/api/playground) and generate client id and secret to use in my application.

When you go to the playground you'll first need to enter the email that's associated with your Monzo account. 
![playground](/img/monzo-login-screen.png)

Then press the login using the link which will arrive in your email and finally open your Monzo app and allow access to your data.
![app aprove](/img/monzo-app-approve.png)

Once you're in create client secret and client id for your app in the "Clients" section of the site. Remember to keep them secret keep them safe!

![client secret](/img/monzo-get-client-creds.png)

## Implement Oauth Login

First we'll need our app to become an http server in order to allow for [oauth login flow](https://auth0.com/docs/flows/authorization-code-flow) with Monzo.
We'll use express for that. Code examples are in typescript. For getting started with typescript I recommend [TSDX](https://github.com/formium/tsdx). 

```typescript
    import express from 'express';
    import axios from 'axios';

    const app = express();
    const port = 8080;
    const address = `http://localhost:${port}`;
    const redirectUri = `${address}/login`;
    const { monzoClientId, monzoClientSecret } = getMonzoSecrets();

    app.get('/', (_, res) => {
        res.redirect(`https://auth.monzo.com/?client_id=${monzoClientId}&redirect_uri=${redirectUri}&response_type=code`)
    });

    app.get('/login', (req, res) => {
        log('login callback');

        if (typeof req.query.code !== 'string') {
            res.send('code is missing');
            return;
        }

        const code: string = req.query.code;

        const params = new URLSearchParams();
        params.append('grant_type', 'authorization_code');
        params.append('client_id', monzoClientId);
        params.append('client_secret', monzoClientSecret);
        params.append('redirect_uri', redirectUri);
        params.append('code', code);
        axios.post('https://api.monzo.com/oauth2/token', params, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then((result) => {
            const creds = result.data;

            securelyStoreCredentials({
                ...creds,
                access_token_expiry: Date.now() + creds.expires_in,
                access_token_expiry_iso: new Date(Date.now() + creds.expires_in).toISOString(),
            });
            res.send('<h1>Use the app to approve login</h1>It\'s ok to close the browser now');
            log('credentials saved');
        }).catch(err => {
            res.send(err)
        });
    });
```

Now we'll be able to get access code for our application to use with the Monzo Api after we log in using similar login flow to what we discussed in the Authentication section above.
With our credentials ready we can start implementing the CLI functionality. I used [Vorpal](https://github.com/dthree/vorpal) as the framework. 

```typescript
    import Vorpal from "vorpal";
    import axios from 'axios';

    type Creds = {
        access_token: string,
        client_id: string
        expires_in: number, 
        refresh_token: string,
        scope: string
        token_type: 'Bearer'
        user_id: string
    }    

    const V = new Vorpal();
    const port = 8080;
    const address = `http://localhost:${port}`;
    const { monzoClientId, monzoClientSecret } = getMonzoSecrets();
    const creds: Creds = getSecurelyStoredCredentials();

    V.delimiter('monzo$');

    V.command('login', 'Get login link')
        .action(function (_: Vorpal.Args) {
            V.log(`open ${address}`);
            return Promise.resolve()
        });

    V.command('refresh', 'Refreshes the access token')
        .action(function (_: Vorpal.Args) {
            const params = new URLSearchParams();
            params.append('grant_type', 'refresh_token');
            params.append('client_id', monzoClientId);
            params.append('client_secret', monzoClientSecret);
            params.append('refresh_token', creds.refresh_token);
            return axios.post('https://api.monzo.com/oauth2/token', params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((result) => {
                const creds: Creds = result.data;

                securelyStoreCredentials({
                    ...creds,
                    access_token_expiry: Date.now() + creds.expires_in,
                    access_token_expiry_iso: new Date(Date.now() + creds.expires_in).toISOString(),
                });
                V.log('credentials saved');
            }).catch(err => {
                V.log(err)
            });
        });
```

I integrated with mozno api using axios. 

```typescript
    import axios from 'axios';

    type LocalSpend = {
        spend_today: number,
        currency: string
    }

    type Balance = {
        balance: number,
        total_balance: number,
        balance_including_flexible_savings: number,
        currency: string,
        spend_today: number,
        local_currency: string,
        local_exchange_rate: number,
        local_spend: LocalSpend[]
    }

    type Transaction = {
        id: string,
        created: string, // iso date of transaction
        description: string,
        amount: number, // negative if you spend money. In pennies for example $2.49 spending is -249
        fees: any,
        currency: string, // eg GBP
        merchant: {
            id: string,
            group_id: string,
            created: string // iso date
            updated: string // iso date
            name: string,
            logo: string,
            emoji: string,
            category: string,
            online: boolean,
            atm: boolean,
            address: {
                short_formatted: string,
                formatted: string,
                address: string,
                city: string,
                region: string,
                country: string,
                postcode: string,
                latitude: number,
                longitude: number,
                zoom_level: number,
                approximate: boolean
            },
            metadata: {
                created_for_merchant: string,  // eg:  "merch_000096608QOl00dDKgLKd7",
                created_for_transaction: string,  // eg:  "tx_00009mtFZGrjVpPCtHwQVt",
                enriched_from_settlement: string,  // eg:  "tx_00009mtFZGrjVpPCtHwQVt",
                google_places_icon: string,  // eg:  "https://maps.gstatic.com/mapfiles/place_api/icons/generic_business-71.png",
                google_places_id: string,  // eg:  "ChIJ0WPR2jIbdkgRZ5kR1g00Us4",
                google_places_name: string,  // eg:  "",
                suggested_tags: string,  // eg:  "#video #fun",
                twitter_id: string,  // eg:  "YouTube",
                website: string,  // eg:  "www.youtube.com"
            }
        }
    }

    function fetchTransactions(accessToken: string, sinceDelta: number): Promise<{ transactions: Transaction[] }> {
        const accountId = getMainAccountId();
        const since = new Date();
        since.setDate(since.getDate() - sinceDelta);

        return axios.get(`https://api.monzo.com/transactions?expand[]=merchant&account_id=${accountId}&since=${since.toISOString()}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => response.data);
    }

    function fetchBalance(accessToken: string): Promise<Balance> {
        const accountId = getMainAccountId();
        return axios.get(`https://api.monzo.com/balance?account_id=${accountId}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }).then(response => response.data);
    }
```

Fetching the transactions from the API and presenting them as a table or exporting to csv. Note that since can't be larger than 89 after your access token is older than 5 minutes as described [here](https://community.monzo.com/t/issue-accessing-transactions-through-api-after-sep-security-update/81533/2).

```typescript
    import Table from "cli-table";
    import currencyFormatter from 'currency-formatter';
    import {ExportToCsv} from "export-to-csv";
    import fs from 'fs';

    V.command('transactions', 'Downloads transactions from monzo api')
        .option('-s --since <since>', 'How many days in the past (up to 89)')
        .option('-e --export <export>', 'Export to csv')
        .action(function (args: Vorpal.Args) {
            const creds: Creds = getSecurelyStoredCredentials();
            const at = creds.access_token;

            return fetchTransactions(at, args.options.since || 2).then(data => {
                const transactions = data.transactions;

                transactions.sort((a, b) => {
                    const aDate = new Date(a.created);
                    const bDate = new Date(b.created);

                    if (aDate > bDate) return 1;
                    if (aDate < bDate) return -1;
                    return 0;
                });

                const headers = ['Merchant', 'Amount', 'Date', 'Month', 'Category', 'Description'];
                const table = new Table({
                    head: headers
                });

                const rows = transactions.filter(t => {
                    return t.amount !== 0;
                }).map(t => ({
                    merchant: t.merchant ? t.merchant.name : "",
                    amount: currencyFormatter.format(t.amount / 100, {code: t.currency}),
                    date: t.created,
                    month: new Date(t.created).getMonth(),
                    category: t.merchant ? t.merchant.category : "",
                    description: t.description
                }));

                rows.forEach(t => { table.push(Object.values(t)) });

                if (args.options.export) {
                    const options = {
                        fieldSeparator: ',',
                        quoteStrings: '"',
                        decimalSeparator: '.',
                        showLabels: true,
                        showTitle: true,
                        title: args.options.export,
                        useTextFile: false,
                        useBom: true,
                        headers: headers
                    };

                    const csvExporter = new ExportToCsv(options);

                    const csvData = csvExporter.generateCsv(rows, true);
                    fs.writeFileSync(`${args.options.export}.csv`,csvData)
                }

                V.log(table.toString());

                return Promise.resolve();
            }).catch((err) => {
                V.log(err);
                return Promise.reject(err)
            })
        });
```

Thanks for reading. Hope you found this useful. If you have any questions don't hesitate to contact me.

## Useful resources
- https://github.com/formium/tsdx
- https://github.com/dthree/vorpal
- https://monzo.com/docs
- https://docs.monzo.com/#errors 
