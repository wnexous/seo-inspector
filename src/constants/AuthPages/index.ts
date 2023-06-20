export interface authPagesInterface {
  noNeedAuth: string[];
}

export const AuthPages: authPagesInterface = {
  noNeedAuth: ["/signin", "/socket.io/"],
};
