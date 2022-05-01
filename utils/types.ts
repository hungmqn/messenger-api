export interface GetCurrentAccount {
  accountId: string;
}

export interface RequestConversations {
  accountId: string;
}

export interface RequestMessages {
  accountId: string;
  conversationId: string | undefined;
  autoFetch?: boolean;
  onCompleted?: Function;
}

export interface SendMessage extends RequestMessages {
  text: string;
}

export interface Account {
  id: string;
  name: string;
}
