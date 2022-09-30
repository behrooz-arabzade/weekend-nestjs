export function isMobile(username: string): boolean {
  return /^(09)?([0-9]{9})/.test(username);
}

export function isEmail(username: string): boolean {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(username);
}

export function getUsernameFromEmail(email: string): string {
  let parts = email.split('@');

  let usernamePart = parts[0];
  //   let domainPart = parts[1].split('.')[0];

  return usernamePart.replaceAll('.', '');
}

export function getRandomString(length: number): string {
  let result = '';
  let characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
