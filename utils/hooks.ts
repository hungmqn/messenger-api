import { useCallback, useEffect, useState } from "react";

import { Account, GetCurrentAccount, RequestConversations, RequestMessages, SendMessage } from "./types";
import { PaginatedResponse, Conversation, Message } from "../types/api";
import { getAccounts, getConversations, getMessages, sendMessage } from "./services";

export const useAccounts = () => {
  const [accounts, setAccounts] = useState<Account[] | null>(null);

  useEffect(() => {
    getAccounts()
      .then((res) => {
        setAccounts(res.data);
      })
      .catch(() => {
        setAccounts(null);
      });
  }, []);

  return accounts;
};

export const useCurrentAccount = ({ accountId }: GetCurrentAccount) => {
  const [account, setAccount] = useState<{ accounts: object[] } | null>(null);

  useEffect(() => {
    getConversations({ accountId })
      .then((res) => {
        setAccount(res.data);
      })
      .catch(() => {
        setAccount(null);
      });
  }, [accountId]);

  return account;
};

export const useConversations = ({ accountId }: RequestConversations, params?: object) => {
  const [conversations, setConversations] = useState<PaginatedResponse<Conversation> | null>(null);

  useEffect(() => {
    getConversations({ accountId }, params)
      .then((res) => {
        setConversations(res.data);
      })
      .catch(() => {
        setConversations(null);
      });
  }, [accountId, params]);

  return conversations;
};

export const useMessages = ({ accountId, conversationId, autoFetch }: RequestMessages, params?: object) => {
  const [data, setData] = useState<PaginatedResponse<Message> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(
    () =>
      getMessages({ accountId, conversationId }, params)
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch(() => {
          setData(null);
          setLoading(false);
        }),
    [accountId, conversationId, params]
  );

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch, fetchData]);

  return { fetchData, data, loading };
};

export const useSendMessage = ({ accountId, conversationId, onCompleted }: RequestMessages) => {
  const [data, setData] = useState<Message | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchData = useCallback(
    ({ text }: { text: string }) => {
      setLoading(true);
      sendMessage({ accountId, conversationId, text })
        .then((res) => {
          setData(res.data);
          setLoading(false);
          if (onCompleted) onCompleted();
        })
        .catch(() => {
          setData(null);
          setLoading(false);
        });
    },
    [accountId, conversationId, onCompleted]
  );

  return {
    fetchData,
    loading,
    data,
  };
};
