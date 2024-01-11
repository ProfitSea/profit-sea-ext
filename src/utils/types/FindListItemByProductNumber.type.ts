export type FindListItemResponseType = {
  found: boolean;
  message: string;
  isLoggedOut?: boolean;
  listItemId?: string;
  error?: boolean;
};
