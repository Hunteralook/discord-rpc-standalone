const { Client } = require("@xhayper/discord-rpc");
const config = require("./config.json");

const clientId = String(config.applicationId || "").trim();

if (!clientId || clientId === "ВСТАВЬ_APPLICATION_ID_СЮДА") {
    console.error("ОШИБКА: открой config.json и вставь свой Discord Application ID.");
    process.exit(1);
}

const client = new Client({ clientId });

const statuses = [
    {
        details: "🍩 Отдыхаю :3",
        state: "💌 ЛС открыт!"
    },
    {
        details: "🐈 мяу мяу",
        state: "✨ ничего не происходит"
    },
    {
        details: "💻 Что-то делаю...",
        state: "🌙 или нет..."
    },
    {
        details: "♡♡",
        state: "тыкни на кнопочку :3"
    }
];

let index = 0;

async function updateRPC() {
    const status = statuses[index];

    await client.user.setActivity({
        details: status.details,
        state: status.state,

        largeImageKey: "logo",
        largeImageText: "мяу ♡",

        smallImageKey: "cat",
        smallImageText: "котя :3",

        buttons: [
            {
                label: "Тык!",
                url: "https://discord.com/users/658672712297742376"
            },
            {
                label: "Опять тык!",
                url: "https://discord.gg/unisono"
            }
        ]
    });

    index = (index + 1) % statuses.length;
}

client.on("ready", async () => {
    console.log("RPC запущен!");

    try {
        await client.user.clearActivity();
    } catch (_) {}

    setTimeout(() => {
        updateRPC().catch(console.error);
    }, 1000);

    setInterval(() => {
        updateRPC().catch(console.error);
    }, 15000);
});

client.on("error", (err) => {
    console.error("Ошибка RPC:", err);
});

client.login();
