import Binance          from 'binance-api-node'
import React            from 'react';

import config           from '../config'
import Error            from '../error/Error'
import fetchFormApi     from '../api/fetch'
import Loader           from '../loader/Loader'
// const client2 = Binance({
//     apiKey: 'xxx',
//     apiSecret: 'xxx',
//     getTime: xxx, // time generator function, optional, defaults to () => Date.now()
//   })



// import './Main.scss'

const client = Binance()

export default class App extends React.Component {

    state = {
        data:               false,
        error:              false,
        loading:            false,
        candles:            false,
    }

    async componentDidMount() {
        try {

            // this.setState({ 
            //     loading:    true 
            // })

            // const data = await fetchFormApi({
            //     endpoint: config.api.harba.harbours.visible,
            //     options: {
            //         method: 'GET',
            //     }
            // })

            console.log('time: ', await client.time())


            const candles = await client.candles({ symbol: 'ETHBTC' })

            console.log(candles)

            this.setState({ 
                // data:       await data.json(),
                loading:    false,
                candles,
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
            candles,
            error: { message },
            loading,
        } = this.state

        console.log(candles)

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

                { candles && 
                    <div>
                        { candles.map( candle => <div> {candle.name} </div>) }
                    </div>
                }
            </div>
        )
    }
}