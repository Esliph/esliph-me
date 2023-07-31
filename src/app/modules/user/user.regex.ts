export const USER_REGEX = {
    PASSWORD: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#%!|\\?/])[0-9a-zA-Z$*&@#%!|\\?/]{8,}$/,
    USERNAME: /^[a-zA-Z0-9\-_.]+$/,
    NAME: /^.{3,40}$/
}
