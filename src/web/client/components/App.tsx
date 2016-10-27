import Header from './common/Header';
import * as React from 'react';

interface IAppProps {
    children: Object;
}

class App extends React.Component<IAppProps, any> {
    public render() {
        return (
            <div>
                <Header />
                {this.props.children}
            </div>
        );
    }
}

export default App;
