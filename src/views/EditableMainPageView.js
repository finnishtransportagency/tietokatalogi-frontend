import React from 'react'

import * as marked from 'marked';
import * as DOMPurify from 'dompurify';


export const EditableMainPageView = () => {
    const [markdown, setMarkdown] = React.useState("");
    return (
        <React.Fragment>
            <textarea
                className="tk-field form-control" rows="15"
                onChange={(e) => setMarkdown(e.target.value)}
            />
            <div 
                dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(marked.parse(markdown))}}
            />
        </React.Fragment>
    );
}