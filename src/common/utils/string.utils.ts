export class StringUtils {
  static randomStr(data: { length: number }) {
    const { length } = data;

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const number = '0123456789';
    const chars = `${letters}${number}`;
    let code = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      code += chars[randomIndex];
    }

    return code;
  }
}
