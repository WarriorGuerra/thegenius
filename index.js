// https://ilp.interledger-test.dev/agwallet Cliente
// https://ilp.interledger-test.dev/geniustest Remitente
// https://ilp.interledger-test.dev/tgtest Receptor

import { createAuthenticatedClient, isFinalizedGrant } from "@interledger/open-payments";
import fs from "fs";
import readline from "readline"; // ✅ Importación MOVIDA arriba

/*(async () => {
    try {
        const privateKey = fs.readFileSync("private.key", "utf8");

        const client = await createAuthenticatedClient({
            walletAddressUrl: "https://ilp.interledger-test.dev/agwallet",
            privateKey: privateKey,
            keyId: "13a118e8-3b06-4b68-8975-9c24a5f5b6c1",
        });

        const sendingWalletAddress = await client.walletAddress.get({
            url: "https://ilp.interledger-test.dev/geniustest"
        });

        const receivingWalletAddress = await client.walletAddress.get({
            url: "https://ilp.interledger-test.dev/tgtest"
        });

        console.log("Remitente:", sendingWalletAddress);
        console.log("Receptor:", receivingWalletAddress);

        // Paso 2: Concesión de pago entrante
        const incomingPaymentGrant = await client.grant.request(
            {
                url: receivingWalletAddress.authServer,
            },
            {
                access_token: {
                    access: [
                        {
                            type: "incoming-payment",
                            actions: ["read", "complete", "create"]
                        }
                    ],
                },
            });

        if (!isFinalizedGrant(incomingPaymentGrant)) {
            throw new Error("La concesión de pago entrante no fue finalizada.");
        }

        const incomingPayment = await client.incomingPayment.create(
            {
                url: receivingWalletAddress.resourceServer,
                accessToken: incomingPaymentGrant.access_token.value,
            },
            {
                walletAddress: receivingWalletAddress.id,
                incomingAmount: {
                    assetCode: receivingWalletAddress.assetCode,
                    assetScale: receivingWalletAddress.assetScale,
                    value: "1000",
                },
            }
        );

        console.log("Pago entrante creado:", incomingPayment);

        // Paso 4: Concesión para cotización
        const quoteGrant = await client.grant.request({
            url: sendingWalletAddress.authServer},
            {access_token: {
                access: [
                    {
                        type: "quote",
                        actions: ["create"],
                    },
                ],
            },
        });

        if (!isFinalizedGrant(quoteGrant)) {
            throw new Error("La concesión de cotización no fue finalizada.");
        }

        const quote = await client.quote.create(
            {
                url: receivingWalletAddress.resourceServer,
                accessToken: quoteGrant.access_token.value,
            },
            {
                walletAddress: sendingWalletAddress.id,
                receiver: incomingPayment.id,
                method: "ilp",
            }
        );

        console.log("Cotización generada:", quote);

        // Paso 6: Concesión para pago saliente
        const outgoingPaymentGrant = await client.grant.request({
            url: sendingWalletAddress.authServer},
            {access_token: {
                access: [
                    {
                        type: "outgoing-payment",
                        actions: ["create"],
                        limits: {
                            debitAmount: quote.debitAmount,
                        },
                        identifier: sendingWalletAddress.id,
                    },
                ],
            },
            interact: {
                start: ["redirect"],
            },
        });

        console.log("Concesión de pago saliente:", outgoingPaymentGrant);

        if (outgoingPaymentGrant.interact?.redirect) {
            console.log("🔗 URL de redirección:", outgoingPaymentGrant.interact.redirect);
        } else {
            console.warn("⚠️ No se encontró URL de redirección en la concesión de pago saliente.");
        }

        // Paso 7: Esperar interacción del usuario
        await new Promise((resolve) => {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });

            rl.question("Presiona Enter para continuar con el pago saliente...", () => {
                rl.close();
                resolve();
            });
        });

        // Paso 8: Finalizar concesión
        const finalizedOutgoingPaymentGrant = await client.grant.continue({
            url: outgoingPaymentGrant.continue.uri,
            accessToken: outgoingPaymentGrant.continue.access_token.value,
        });

        if (!isFinalizedGrant(finalizedOutgoingPaymentGrant)) {
            throw new Error("Se espera que finalice la concesión");
        }

        console.log("✅ Concesión de pago saliente finalizada");

        // Paso 9: Aquí iría la ejecución del pago saliente

    } catch (err) {
        console.error("❌ Error durante la ejecución del flujo de pago:");
        console.error(err);
    }
})();*/


export async function payment() {
        try {
        const privateKey = fs.readFileSync("private.key", "utf8");

        const client = await createAuthenticatedClient({
            walletAddressUrl: "https://ilp.interledger-test.dev/agwallet",
            privateKey: privateKey,
            keyId: "13a118e8-3b06-4b68-8975-9c24a5f5b6c1",
        });

        const sendingWalletAddress = await client.walletAddress.get({
            url: "https://ilp.interledger-test.dev/geniustest"
        });

        const receivingWalletAddress = await client.walletAddress.get({
            url: "https://ilp.interledger-test.dev/tgtest"
        });

        console.log("Remitente:", sendingWalletAddress);
        console.log("Receptor:", receivingWalletAddress);

        // Paso 2: Concesión de pago entrante
        const incomingPaymentGrant = await client.grant.request(
            {
                url: receivingWalletAddress.authServer,
            },
            {
                access_token: {
                    access: [
                        {
                            type: "incoming-payment",
                            actions: ["read", "complete", "create"]
                        }
                    ],
                },
            });

        if (!isFinalizedGrant(incomingPaymentGrant)) {
            throw new Error("La concesión de pago entrante no fue finalizada.");
        }

        const incomingPayment = await client.incomingPayment.create(
            {
                url: receivingWalletAddress.resourceServer,
                accessToken: incomingPaymentGrant.access_token.value,
            },
            {
                walletAddress: receivingWalletAddress.id,
                incomingAmount: {
                    assetCode: receivingWalletAddress.assetCode,
                    assetScale: receivingWalletAddress.assetScale,
                    value: "1000",
                },
            }
        );

        console.log("Pago entrante creado:", incomingPayment);

        // Paso 4: Concesión para cotización
        const quoteGrant = await client.grant.request({
            url: sendingWalletAddress.authServer},
            {access_token: {
                access: [
                    {
                        type: "quote",
                        actions: ["create"],
                    },
                ],
            },
        });

        if (!isFinalizedGrant(quoteGrant)) {
            throw new Error("La concesión de cotización no fue finalizada.");
        }

        const quote = await client.quote.create(
            {
                url: receivingWalletAddress.resourceServer,
                accessToken: quoteGrant.access_token.value,
            },
            {
                walletAddress: sendingWalletAddress.id,
                receiver: incomingPayment.id,
                method: "ilp",
            }
        );

        console.log("Cotización generada:", quote);

        // Paso 6: Concesión para pago saliente
        const outgoingPaymentGrant = await client.grant.request({
            url: sendingWalletAddress.authServer},
            {access_token: {
                access: [
                    {
                        type: "outgoing-payment",
                        actions: ["create"],
                        limits: {
                            debitAmount: quote.debitAmount,
                        },
                        identifier: sendingWalletAddress.id,
                    },
                ],
            },
            interact: {
                start: ["redirect"],
            },
        });

        console.log("Concesión de pago saliente:", outgoingPaymentGrant);

        if (outgoingPaymentGrant.interact?.redirect) {
            console.log("🔗 URL de redirección:", outgoingPaymentGrant.interact.redirect);
        } else {
            console.warn("⚠️ No se encontró URL de redirección en la concesión de pago saliente.");
        }

        // Paso 7: Esperar interacción del usuario
        await new Promise((resolve) => {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });

            rl.question("Presiona Enter para continuar con el pago saliente...", () => {
                rl.close();
                resolve();
            });
        });

        // Paso 8: Finalizar concesión
        const finalizedOutgoingPaymentGrant = await client.grant.continue({
            url: outgoingPaymentGrant.continue.uri,
            accessToken: outgoingPaymentGrant.continue.access_token.value,
        });

        if (!isFinalizedGrant(finalizedOutgoingPaymentGrant)) {
            throw new Error("Se espera que finalice la concesión");
        }

        console.log("✅ Concesión de pago saliente finalizada");
        return outgoingPaymentGrant.interact.redirect
        // Paso 9: Aquí iría la ejecución del pago saliente

    } catch (err) {
        console.error("❌ Error durante la ejecución del flujo de pago:");
        console.error(err);
    }
}