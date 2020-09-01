
const importSecretKey = (rawKey) => {
    return window.crypto.subtle.importKey(
        "jwk",
        rawKey,
        "AES-CTR",
        true,
        ["encrypt", "decrypt"]
    );
};

const counter = new TextEncoder("utf-8").encode(process.env.REACT_APP_ENCRYPT_COUNTER);

let key;

const loadKey = async () => {
    key = await importSecretKey(JSON.parse(process.env.REACT_APP_ENCRYPT_KEY));
};

const encodeMessage = (message) => {
    let enc = new TextEncoder();
    return enc.encode(message);
};

const encryptMessage = async (message) => {
    if (!key) {
        await loadKey();
    }

    let encoded = encodeMessage(message);
    // The counter block value must never be reused with a given key.
    return await window.crypto.subtle.encrypt(
        {
            name: "AES-CTR",
            counter,
            length: 64
        },
        key,
        encoded
    );
};

const decryptMessage = async (message) => {
    if (!key) {
        await loadKey();
    }

    let decrypted = await window.crypto.subtle.decrypt(
        {
            name: "AES-CTR",
            counter,
            length: 64
        },
        key,
        message
    );

    let dec = new TextDecoder();
    return dec.decode(decrypted);
};

export {decryptMessage, encryptMessage}