import React, { Component } from 'react';

import Sortable from 'sortablejs'
let rectSort;
let sqSort;

class Main extends Component {

    state = {
        data : [],
        react : [
            { dataId: 'r1', img: 'http://via.placeholder.com/100x40' },
            { dataId: 'r2', img: 'http://via.placeholder.com/100x60' },
            { dataId: 'r3', img: 'http://via.placeholder.com/100x80' },
            { dataId: 'r4', img: 'http://via.placeholder.com/120x90' },
        ],
        squares: [
            { dataId: 's1', img: 'http://via.placeholder.com/30x30' },
            { dataId: 's2', img: 'http://via.placeholder.com/40x40' },
            { dataId: 's3', img: 'http://via.placeholder.com/60x60' },
            { dataId: 's4', img: 'http://via.placeholder.com/80x80' },
        ]
    }

    componentDidMount(){

        const dataR = localStorage.getItem('rectangle');
        const dataS = localStorage.getItem('square');
        if (dataR && dataS) {
            const rec = JSON.parse(dataR);
            const dataId = rec[0].dataId;

            console.log(this.state.react.find((el => el.dataId === dataId)));

            this.setState({ react: JSON.parse(dataR), squares: JSON.parse(dataS)  }, () => {
                console.log(this.state)
            });
            console.log("data found", dataR);
        } else
            console.log("data not found");

        let rectElement = document.getElementById("rectangle")
        let sqElement = document.getElementById("square")



        rectSort=Sortable.create(rectElement,{
            group:{
                name:'rectangle',
                put:'square',
                pull: function (to,from) {
                    return from.el.children.length>2

                }
            },
            store:{
                get: function (sortable) {
                    var order = localStorage.getItem(sortable.options.group.name);
                    return order ? JSON.parse(order) : [];
                },

                set: function (sortable) {
                    console.log("Rect called");
                    var order = sortable.toArray().map(data => {
                        const el = data.split('||');
                        // return  el[0];
                        return { dataId: el[0], img: el[1] };
                    });
                    localStorage.setItem(sortable.options.group.name, JSON.stringify(order));
                }
            }
        });


        sqSort=Sortable.create(sqElement,{
            group:{
                name: 'square',
                put: 'rectangle',
                pull: function (to,from) {
                    return from.el.children.length>2

                }
            },
            store:{
                get: function (sortable) {
                    var order = localStorage.getItem(sortable.options.group.name);
                    return order ? JSON.parse(order) : [];
                },
                set: function (sortable) {
                    console.log('Square')
                    var order = sortable.toArray().map(data => {
                        const el = data.split('||');
                        // return el[0];
                        return { dataId: el[0], img: el[1] };
                    });
                    localStorage.setItem(sortable.options.group.name, JSON.stringify(order));
                }

            }
        })
    }
    handleSave(){
        let switcher = document.getElementById("switcher")
        let state= rectSort.option("disabled")
        rectSort.option("disabled",!state)
        sqSort.option("disabled",!state)

        switcher.innerHTML = state? 'save': 'shuffle'

    }
    render() {
        return (
            <div >
                <div>
                    <span><button id="switcher" onClick={this.handleSave} >Save</button></span>
                </div>
                <h1>Hello Main </h1>
                <div id="rectangle" >
                    {this.state.react.map((rec, index) => (
                        <div data-id={rec.dataId + '||' + rec.img} key={index}>
                            <img  src={rec.img} alt="hello" />
                            <br/>
                        </div>
                    ))}
                </div>
                <h1>Hello square </h1>
                <div id="square" >
                    {this.state.squares.map((rec, index) => (
                        <div data-id={rec.dataId + '||' + rec.img} key={index}>
                            <img  src={rec.img} alt="square" />
                            <br/>
                        </div>
                    ))}
                </div>

            </div>
        );
    }
}

export default Main;
