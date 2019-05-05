export const marvelApi = {
  publicKey: `${process.env.REACT_APP_PUBLIC_API_KEY}`,
  privateKey: `${process.env.REACT_APP_PRIVATE_API_KEY}`,
  baseUrl: `${window.location.protocol || 'http'}//gateway.marvel.com:443`,
}