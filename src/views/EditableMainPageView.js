import React from 'react'

import * as marked from 'marked';
import * as DOMPurify from 'dompurify';
import EasyMDE from 'easymde';
import "easymde/dist/easymde.min.css";
import axios from 'axios';



// TODO: add proper addresses here
const sendPost = (mainText) => {
    axios.post('http://localhost:3000/tietokatalogi/rest/frontpage/', { mainText: mainText, sideText: 'bar' })
    .then(response => {
        console.log(response);
    })
    .catch(function(error) {
        console.log("error", error);
    });
};

const getTest = () => {
    return axios.get('http://localhost:3000/tietokatalogi/rest/frontpage')
    .then(response => response.data)
    .catch(error => console.log(error));
}

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
            },
            autoRefresh: { delay: 300 }
        });
        createdEasyMDE.codemirror.on("change", (e) => {
            setMarkdown(createdEasyMDE.value());
        })

        // fetch and populate
        getTest().then(data => {
            console.log('received data:', data);
            setMarkdown(data.mainText);
            createdEasyMDE.value(data.mainText);
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
                        onClick={() => {
                            setEdit(false);
                            sendPost(markdown);
                        }}
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