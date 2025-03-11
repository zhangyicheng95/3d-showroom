import React, { Component } from 'react';
import './index.less'

class NumberAnimation extends Component {

    constructor(props: any) {
        super(props);
        this.lineHeight = 36;
        this.defaultSize = 16;
    }
    render() {
        const { value } = this.props;
        if (isNaN(value)) {//非数字
            return (
                <div className="number-animation-wrap">
                    <div className="number-animation-wrap-hidden">.</div>
                    <div className="number-animation">
                        <div className="number">{value}</div>
                    </div>
                </div>
            )
        }
        let style = {
            top: (-1 * value * this.lineHeight / this.defaultSize) + 'rem'
        }

        return (
            <div className="number-animation-wrap">
                <div className="number-animation-wrap-hidden">0</div>
                <div className="number-animation" style={style}>
                    <div className="number">0</div>
                    <div className="number">1</div>
                    <div className="number">2</div>
                    <div className="number">3</div>
                    <div className="number">4</div>
                    <div className="number">5</div>
                    <div className="number">6</div>
                    <div className="number">7</div>
                    <div className="number">8</div>
                    <div className="number">9</div>
                </div>
            </div>
        )
    }
}

export default NumberAnimation;