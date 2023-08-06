import { ENUM_TEMPLATE_MESSAGE } from '@util/messages/template.messages'

export const ENUM_MAIL_MESSAGES = {
    TITLE_IS_EMPTY: ENUM_TEMPLATE_MESSAGE.required('Title'),
    BODY_IS_EMPTY: ENUM_TEMPLATE_MESSAGE.required('Body'),
    SENDER_IS_EMPTY: ENUM_TEMPLATE_MESSAGE.required('Sender'),
    RECIPIENTS_IS_EMPTY: ENUM_TEMPLATE_MESSAGE.required('Recipients'),
}
