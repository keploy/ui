import React from 'react';
import '../../../static/onboardingCss/Documentation.css'

export default function Documentation(){
    return(
        <div>
            <img src="https://docs.keploy.io/img/keploy-logo-dark.svg" alt="Keploy Logo" className='logoImg'/>
            <br />
            <br />
            <h2>Installation</h2>
            <br />
            <div className='ident'>
                <h4>Start Keploy Server</h4>
                <br />
                <code style={{width:'50%'}}>
                    <div className='codeContent'>
                        git clone https://github.com/keploy/keploy.git && cd keploy
                        <br />
                        docker-compose up
                    </div>
                </code>
                <p>The UI can be accessed at <a href={"http://localhost:8081"}>http://localhost:8081</a></p>
            <br />
            <h4>Helm Chart</h4>
            <p>Keploy can also be installed to your Kubernetes cluster using the Helm chart available <a href={"https://github.com/keploy/keploy/tree/main/deployment/keploy"}>here</a></p>
            <br />
            </div>
            <h2>Run Sample application</h2>
            <div className='ident'>
                <br />
                <p>Demos using Echo/PostgreSQL and Gin/MongoDB are available <a href={"https://github.com/keploy/samples-go"}>here</a>. For this example, we will use the Echo/PostgreSQL sample.</p>
                <code style={{width:'60%'}}>
                    <div className='codeContent'>
                        git clone https://github.com/keploy/samples-go && cd samples-go/echo-sql
                        <br/>
                        go mod download
                    </div>
                </code>
                <br />
                <h5>Start PostgreSQL instance</h5>
                <code style={{width:'20%'}}>
                    <div className='codeContent'>
                        docker-compose up -d
                    </div>
                </code>
                <br />
                <h5>Run the application</h5>
                <code style={{width:'25%'}}>
                    <div className='codeContent'>
                        go run handler.go main.go
                    </div>
                </code>
                <br />
            </div>
            <br />
            <h2>Generate testcases</h2>
            <div className='ident'>
                <br />
                <img src="https://github.com/keploy/docs/raw/main/static/gif/record-testcase.gif?raw=true" alt="Testcase Gif" className='docImg'/>
                <br />
                <br />
                <p>To genereate testcases we just need to make some API calls. You can use <a href={"https://www.postman.com/"}>Postman</a>,<a href={"https://hoppscotch.io/"}>Hoppscotch</a>, or simply curl</p>
                <br />
                <h5>1. Generate shortned url</h5>
                <br />
                <code style={{width:'35%'}}>
                    <div className='codeContent'>
                        {`curl --request POST`} \{`\n`}
                        {`--url http://localhost:8080/url`} \{`\n`}
                        {`--header 'content-type: application/json'`} \{`\n`}
                        {`--data `}'{`{\n`}
                        {`   `}"url :" "https://github.com"{`\n`}
                        {`}`}'
                    </div>
                </code>
                <br />
                <h5>2. Redirect to original url from shortened url</h5>
                <br />
                <code style={{width:'35%'}}>
                    <div className='codeContent'>
                        {`curl --request GET`} \{`\n`}
                        {`   `}--url http://localhost:8080/GuwHCgoQ
                    </div>
                </code>
                <br />
            </div>
            <br />
            <h2>Integration with native Go test framework</h2>
            <div className='ident'>
                <br />
                <img src="https://github.com/keploy/docs/raw/main/static/gif/unit-test.gif?raw=true" alt="Test Integration Gif" className='docImg'/>
                <br />
                <br />
                <p>You just need 3 lines of code in your unit test file and that's it!!🔥🔥🔥</p>
                <br />
                <code style={{width:'40%'}}>
                    <div className='codeContent'>
                        {`import (\n`}
                        {`   `}{`github.com/keploy/go-sdk/keploy\n`}
                        {`   `}{`testing\n`}
                        {`)\n`}
                        {`func TestKeploy(t *testing.T) {\n`}
                        {`   `}{`keploy.SetTestMode()\n`}
                        {`   `}{`go main()\n`}
                        {`   `}{`keploy.AssertTests(t)\n`}
                        {`}`}
                    </div>
                </code>
                <br />
                <h4>Run the testcases</h4>
                <br />
                <p>Note: Before running tests stop the sample application</p>
                <br />
                <code style={{width:'45%'}}>
                    <div className='codeContent'>
                        go test -coverpkg=./... -covermode=atomic  ./...
                    </div>
                </code>
                <br />
                <p>this should show you have 74.4% coverage without writing any code!</p>
                <br />
                <code style={{width:'60%'}}>
                    <div className='codeContent'>
                        ok      echo-psql-url-shortener 5.820s  coverage: 74.4% of statements in ./...
                    </div>
                </code>
                <br />
                <p>All of these can be visualised here - <a href={"http://localhost:8081/testlist"}>http://localhost:8081/testlist</a></p>
            </div>
        </div>
    )
}