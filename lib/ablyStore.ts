// ablyStore.js
import { create } from "zustand";
import { Realtime, Types } from "ably";

let singletonAbly: Realtime | null = null;
let singletonChannel: Types.RealtimeChannelCallbacks | null = null;

type AblyState = {
    ably: Realtime | null;
    channel: Types.RealtimeChannelCallbacks | null;
    initialize: () => void;
    close: () => void;
};

export const useAblyStore = create<AblyState>((set) => ({
    ably: null,
    channel: null,
    initialize: () => {
        if (!singletonAbly) {
            singletonAbly = new Realtime({
                authUrl: `${process.env.NEXT_PUBLIC_HOSTNAME}/api/createTokenRequest`,
            });
            console.log("Initializing new Ably connection.");
        } else {
            console.log("Using existing Ably connection.");
        }

        if (!singletonChannel) {
            singletonChannel = singletonAbly.channels.get("comment-channel");
            console.log("Initializing new Ably channel.");
        } else {
            console.log("Using existing Ably channel.");
        }

        set({ ably: singletonAbly, channel: singletonChannel });
    },
    close: () => {
        set((state) => {
            console.log(
                "Closing Ably connection and unsubscribing from channel."
            );

            state.channel?.unsubscribe();
            state.ably?.close();

            singletonChannel = null;
            singletonAbly = null;

            return { ably: null, channel: null };
        });
    },
}));
