
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
importSecretKey(JSON.parse(process.env.REACT_APP_ENCRYPT_KEY)).then((k) => key = k);

const encodeMessage = (message) => {
    let enc = new TextEncoder();
    return enc.encode(message);
};

/*
  Get the encoded message, encrypt it and display a representation
  of the ciphertext in the "Ciphertext" element.
  */
const encryptMessage = async (message) => {
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

/*
  Fetch the encoded message and decrypt it.
  Write the decrypted message into the "Decrypted" box.
  */
const decryptMessage = async (message) => {
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