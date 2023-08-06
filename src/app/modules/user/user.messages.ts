import { ENUM_TEMPLATE_MESSAGE } from '@util/messages/template.messages'

export const ENUM_USER_MESSAGES = {
    NAME_IS_EMPTY: ENUM_TEMPLATE_MESSAGE.required('Name'),
    EMAIL_IS_EMPTY: ENUM_TEMPLATE_MESSAGE.required('Email'),
    PASSWORD_IS_EMPTY: ENUM_TEMPLATE_MESSAGE.required('Password'),
    USERNAME_IS_EMPTY: ENUM_TEMPLATE_MESSAGE.required('Username'),
    FORMAT_EMAIL_INVALID: 'Invalid "Email" format',
    FORMAT_PASSWORD_INVALID:
        'The "Password" must have between 6 and 15 digits, with uppercase and lowercase letters, numbers and one of the following special characters: $*&@#%!|\\?/',
    FORMAT_USERNAME_INVALID:
        'The "Username" can only contain numbers and uppercase and lowercase letters, without spaces, and may have the following special characters: -_.',
    FORMAT_NAME_INVALID: 'The "Name" must be between 3 to 40 characters long'
}
