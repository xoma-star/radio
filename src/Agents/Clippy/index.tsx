import React from 'react'
import map from './map.png'
import './Clippy.css'
import {animations} from './animations'

export class Clippy extends React.Component<any, any>{
    constructor(props: any) {
        super(props)
        this.state = {
            x: 0,
            y: 0
        }
    }

    randomIdle = ['IdleHeadScratch']

    playAnimation(name: keyof typeof animations, i: number = 0, time: number = 0) {
        if(animations[name].frames.length - 1 > i){
            let v = animations[name].frames[i]
            if(typeof v !== 'undefined'
                && typeof v.images !=='undefined'
                && typeof v.images[0] !== 'undefined'
                && typeof v.images[0][0] !== 'undefined'
                && typeof v.images[0][1] !== 'undefined'
                //@ts-ignore
            ) setTimeout(() => {this.setState({x: -v.images[0][0], y: -v.images[0][1]})}, time + v.duration)
            this.playAnimation(name,i + 1, time + v.duration)
        }
        else setTimeout(() => this.setState({x: 0, y: 0}), time)
    }

    componentDidMount() {
        setTimeout(() => this.playAnimation("GestureLeft"), 1000)
        setInterval(() => this.playAnimation("GetAttention"), 30000)
    }

    render(){return <div
        className={'clippy'}
             style={{
                 background: `url(${map}) ${this.state.x}px ${this.state.y}px no-repeat`
             }}
        />
    }
}