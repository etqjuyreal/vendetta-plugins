import { before } from "vendetta";
import { findByProps } from "vendetta/metro";

const MessageModule = findByProps("sendMessage", "editMessage");

function change(str: string): string {
    return str.replace(/\w+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
}

const unpatch = before("sendMessage", MessageModule, (args) => {
    if (args[1]?.content) {
        args[1].content = change(args[1].content);
    }
});

export function onUnload() {
    unpatch();
}
