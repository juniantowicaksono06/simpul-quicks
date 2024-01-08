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
    status: "READ" | "UNREAD",
    reply?: string
}

interface SelectedChats {
    id?: number,
    title?: string,
    particants?: number,
    chats?: Chats[],
}

interface ConversationItem {
    from: string,
    times: string,
    text: string,
    reply?: string
}

interface DatePickerProps {
    dateValue?: Partial<string>
}

interface ReplyTo {
    text: string,
    to: string
}

interface AppState {
    selectedChat: SelectedChats,
    loading: boolean,
    reply: Partial<ReplyTo>
}

interface DescriptionProps {
    text?: string | undefined
}

interface TaskList {
    id: number,
    taskName: string
}

interface TaskCardProps {
    id: number,
    title: string,
    description?: string,
    date?: string,
    daysLeft?: number,
    taskStatus: "DONE" | "NOT DONE"
    separator: Partial<boolean>,
    taskLabel: Array<string>
}

interface TaskLabelProps {
    tasks: Array<string>
}

export type {ListChatDataProps, PopupProps, ListChatProps, LoadingProps, SelectedChats, Chats, DatePickerProps, AppState, DescriptionProps, TaskCardProps, ConversationItem, TaskList, TaskLabelProps, ReplyTo}