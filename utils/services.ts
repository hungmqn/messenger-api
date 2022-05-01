import Api from "./Api";

import { GetCurrentAccount, RequestConversations, RequestMessages, SendMessage } from "./types";

const genGetParamsUrl = (endpoint: string, params: object) => {
  if (!params) return endpoint;
  else {
    const queryString = Object.keys(params)
      .map((key) => `${key}=${params[key as keyof typeof params]}`)
      .join("&");
    return queryString ? `${endpoint}?${queryString}` : endpoint;
  }
};

export const getAccounts = async () => await Api.get(`/api/accounts`);
export const getCurrentAccount = async ({ accountId }: GetCurrentAccount, params: object = {}) =>
  await Api.get(genGetParamsUrl(`/api/account/${accountId}`, params));

export const getConversations = async ({ accountId }: RequestConversations, params: object = {}) =>
  await Api.get(genGetParamsUrl(`/api/account/${accountId}/conversations`, params));

export const getMessages = async ({ accountId, conversationId }: RequestMessages, params: object = {}) =>
  await Api.get(genGetParamsUrl(`/api/account/${accountId}/conversation/${conversationId}/messages`, params));

export const sendMessage = async ({ accountId, conversationId, text }: SendMessage) =>
  await Api.post(`/api/account/${accountId}/conversation/${conversationId}/messages`, {
    text,
  });
