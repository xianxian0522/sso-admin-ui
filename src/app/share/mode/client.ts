export interface Client {
  code?: number;
  data: {
    Content: [];
    Total: 2
  };
  msg: string;
}

export interface ClientList {
  id: number;
  name: string;
  active: boolean;
  appType: number;
  app_id: number;
  client_id: string;
  domain: string;
  edges: any;
  frame_options: string;
  redirectUrl: string;
  response_type: string;
  scope: string;
  secret: string;
  created_at: string;
  updated_at: string;
}
