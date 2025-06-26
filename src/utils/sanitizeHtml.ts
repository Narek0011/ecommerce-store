import sanitizeHtml from 'sanitize-html';

export const sanitizeReviewHtml = (dirtyHtml: string): string => {
    return sanitizeHtml(dirtyHtml, {
        allowedTags: [
            'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
            'p', 'br', 'div', 'span',
            'strong', 'b', 'em', 'i', 'u',
            'ul', 'ol', 'li',
            'a',
            'blockquote', 'code', 'pre'
        ],
        allowedAttributes: {
            'a': ['href', 'title', 'target', 'rel'],
            'img': ['src', 'alt', 'width', 'height']
        },
        allowedSchemes: ['http', 'https', 'mailto'],
        transformTags: {
            'a': (tagName, attribs) => {
                return {
                    tagName: 'a',
                    attribs: {
                        ...attribs,
                        target: '_blank',
                        rel: 'noopener noreferrer'
                    }
                };
            }
        },
        allowedClasses: {
            'p': ['text-*', 'align-*'],
            'span': ['highlight']
        },
        allowedDataAttributes: true,
        allowIframe: false,
        textFilter: (text) => {
            return text.replace(/\n{2,}/g, '\n');
        }
    });
};