
import React            from 'react'

import config           from '../config'
import Error            from '../error/Error'
import fetchFormApi     from '../api/fetch'
import Loader           from '../loader/Loader'
import Map              from '../map/Map'

import './Main.scss'


export default class App extends React.Component {

    state = {
        data:               false,
        error:              false,
        loading:            false,
    }

    async componentDidMount() {
        try {

            this.setState({ 
                loading:    true 
            })

            const data = await fetchFormApi({
                endpoint: config.api.harba.harbours.visible,
                options: {
                    method: 'GET',
                }
            })

            this.setState({ 
                data:       await data.json(),
                loading:    false,
            })

        } catch (error) {
            this.setState({ 
                error,
                loading:    false,
            })
        }
    }

    render() {

        const {
            data,
            error: { message },
            loading,
        } = this.state

        return (
            <div className="harba-main">
                { loading && 
                    <Loader 
                        height={360} 
                        width={360} 
                        timeout={0} 
                    />
                }

                { message && 
                    <Error 
                        message={message}
                    />
                }

                { data && 
                    <Map 
                        data={data} 
                    />
                }
            </div>
        )
    }
}