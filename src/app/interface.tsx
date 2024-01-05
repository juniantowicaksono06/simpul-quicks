interface ListChatDataProps {
    id: number,
    title: string;
    last_chat: {
      from?: string;
      text: string;
    };
    status: "UNREAD" | "READ";
    date: string;
    type: "group" | "private";
}


interface ListChatProps {
    data: ListChatDataProps[]
}


interface PopupProps {
    type: string
}

interface LoadingProps {
    text?: string,
    className?: string,
    size?: "SMALL" | "LARGE"
}

interface Chats {
    text: string,
    date: string,
    from: string, 
    status: "READ" | "UNREAD"
}

interface SelectedChats {
    id: number,
    title: string,
    particants?: number,
    chats: Chats[]
}

export type {ListChatDataProps, PopupProps, ListChatProps, LoadingProps, SelectedChats, Chats}