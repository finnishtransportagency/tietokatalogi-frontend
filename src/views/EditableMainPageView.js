import React from 'react'

import * as marked from 'marked';
import * as DOMPurify from 'dompurify';
import EasyMDE from 'easymde';
import "easymde/dist/easymde.min.css";


export const EditableMainPageView = () => {
    const [markdown, setMarkdown] = React.useState("");
    const [edit, setEdit] = React.useState(false);
    const textareaRef = React.useRef(null);

    React.useEffect(() => {
        const createdEasyMDE = new EasyMDE({
            element: textareaRef && textareaRef.current,
            spellChecker: false,
            renderingConfig: {
                sanitizerFunction: (html) => (
                    DOMPurify.sanitize(html)
                )
            }
        });
        createdEasyMDE.codemirror.on("change", (e) => {
            setMarkdown(createdEasyMDE.value());
        })
    }, []);

    return (
        <React.Fragment>
            <div style={{ display: edit ? 'inline' : 'none' }}>
            <textarea
                ref={textareaRef}
            />
            </div>
            {edit ? 
                <div className="btn-toolbar">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setEdit(false)} // TODO: save should happen here
                    >
                        Tallenna
                    </button>
                </div>
            :
            <React.Fragment>
                <div
                    style={{ backgroundColor: 'ghostwhite' }}
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(marked.parse(markdown)) || "(ei sisältöä)"
                    }}>
                </div>
                <div className="btn-toolbar">
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setEdit(true)}
                    >
                        Muokkaa
                    </button>
                </div>
            </React.Fragment>
            }
            
        </React.Fragment>
    );
}