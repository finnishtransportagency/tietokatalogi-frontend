import React from 'react'

import * as marked from 'marked';
import * as DOMPurify from 'dompurify';


export const EditableMainPageView = () => {
    const [markdown, setMarkdown] = React.useState("");
    const [edit, setEdit] = React.useState(false);
    return (
        <React.Fragment>
            {edit ? 
                <div>
                    <textarea
                        defaultValue={markdown}
                        className="tk-field form-control" rows="15"
                        onChange={(e) => setMarkdown(e.target.value)}
                    />
                    <div className="btn-toolbar">
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={() => setEdit(false)} // TODO: save should happen here
                        >
                            Tallenna
                        </button>
                    </div>
                </div>
            : 
            <React.Fragment>
                <div
                    style={{ backgroundColor: 'ghostwhite' }}
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(marked.parse(markdown))
                    }} />
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