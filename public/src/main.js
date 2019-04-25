import xs from 'xstream'
import { run } from '@cycle/run'
import { makeDOMDriver, h1, div, button, input } from '@cycle/dom'
import { adapt } from '@cycle/run/lib/adapt'
import './index.css'

function main(sources) {
    const button_click$ = sources.DOM.select('button').events('click').startWith('')
    const input_enter$ = sources.DOM.select('input').events('change')
    const messages = sources.DOM.select('.messages')
    console.log(messages)
    //model
    const input_v$ = input_enter$
        .map(e => e.target.value)
        .startWith('')
    const messages$ = xs.combine(input_v$, button_click$)
        .map(([v]) => v)

    //view$
    const vdom$ = messages$
        .map(v => div('.container', [
            div('.messages', v),
            div('.bottom', [
                input({ type: 'text' }, ''),
                button('send')
            ])
        ]))
    return {
        DOM: vdom$
    }
}


const drivers = {
    DOM: makeDOMDriver('#app'),
}

run(main, drivers)