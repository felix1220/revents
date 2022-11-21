import { Component } from 'react'
import { Button } from "semantic-ui-react";
import { Directions } from './directions';
import cuid from "cuid";
import finalPropsSelectorFactory from 'react-redux/es/connect/selectorFactory';

export default class MockComponent extends Component {

    
    constructor() {
        super();

        this.state = {
            positions:[],
            emojis: [],
            sheet:null,
            initialDown: { x:0, y:0 },
            isMouseDown: false,
            gameMode:'Select',
            userSelection: [],
            highlights:[],
            mockSelectedEmojis:[],
            timerStarted: false,
        }

    }

    getMousePos = (evt) => {
        var rect = this.canvas.getBoundingClientRect();
         return {
            x: evt.clientX - rect.left,
            y:  evt.clientY - rect.top
         }
    }
    findDirection = (pts) => {
        let subDir = Directions.N;
        if(pts.length > 1) {
            const start = pts[0];
            const end = pts[pts.length - 1];
            if (start.y === end.y && end.x - start.x > 1) {
                subDir = Directions.HR;
            } else if (start.y === end.y && end.x - start.x < 0) {
                subDir = Directions.HL;
            } else if (start.x === end.x && end.y - start.y < 0) {
                subDir = Directions.VU;
            } else if (start.x === end.x && end.y - start.y > 1) {
                subDir = Directions.VD;
            } else if(end.x - start.x > 1 && end.y - start.y < 0) {
                subDir = Directions.DRU
            } else if(end.x - start.x > 1 && end.y - start.y > 0) {
                subDir = Directions.DRD;
            } else if(end.x - start.x < 0 && end.y - start.y < 0) {
                subDir = Directions.DLU;
            } else {
                subDir = Directions.DLD;
            }
        }
        return subDir;
    }
    selectSingleEmoji = (pos) => {
        const localSelection = [...this.state.userSelection];
        const onlyVisible = this.state.positions.filter(f => f.x < this.canvas.width && f.y < this.canvas.height);
        for(let x = 0; x < onlyVisible.length; x++) {
            // onlyVisible.forEach( f => {
                const f = onlyVisible[x];
                if(f.x < pos.x && pos.x < f.x + 17 &&
                    f.y < pos.y && pos. y < f.y + 17) {
                         const emoji = this.state.emojis.find( e => e.ID === f.EmojiID)
                         console.log('picked emoji => ',  emoji, f);
                         localSelection.push(f)
                         this.setState(
                             (state) => {
                                 return {
                                     userSelection: [
                                         ...state.userSelection,
                                         f
                                     ]
                                 }
                             },
                             () => {
     
                             }
                         );
                       
                        break;
                     }
             //});
        }//end for loop
       

       //const direction  = this.findDirection(this.state.userSelection);
        const direction = this.findDirection(localSelection);
       if(direction) {
        this.buildHighlighter(direction, localSelection);
       
       }
    }
    displayHighlighter = (ctx) => {
        ctx.beginPath();

        this.state.highlights.forEach( obj=> {
            //console.log('The points are => ', obj.points);
            obj.points.forEach( (point,index) => {
                ctx.moveTo(point.x, point.y);
                if(index + 1 < obj.points.length) {
                    ctx.lineTo(obj.points[index+1].x, obj.points[index+1].y)
                }
                
            });
            const end = obj.points[obj.points.length - 1];
            if(end) {
                ctx.moveTo(end.x, end.y);
                ctx.lineTo(obj.points[0].x, obj.points[0].y);
            }
           
        });
        ctx.stroke();
       
    }
    updateHighlighter = (deltaX, deltaY) => {
        const newHighlights = [...this.state.highlights];
        newHighlights.forEach( obj => {

            const newPoints = obj.points.map( m => {
                return {
                    x: m.x + deltaX,
                    y: m.y + deltaY
                }
            });
            obj.points = [...newPoints]
        });
        this.setState(
            () => {
                return {
                    highlights: newHighlights
                }
            },
            () => {

            }
        )
    }
    buildHighlighterBatch = () => {
        let newHighlights = [...this.state.highlights];
        newHighlights.forEach( obj => {
           let first = obj.points[0];
           let last = obj.points[2];
           let firstPos = this.state.positions.find(f => f.ID === first.ID);
           let lastPos = this.state.positions.find(f => f.ID === last.ID);
           const pen = this.createThePen(first.Direction, firstPos, lastPos);

           let newObj = {
             ...obj,
             points: pen
           }
           newHighlights = [...newHighlights.filter(f => f.id !== obj.id), newObj]
        });
        this.setState(
            () => {
                return {
                    highlights: newHighlights
                }
            },
            () => {

            }
        )
    }
    buildHighlighter = (direction, localSelection) => {
        console.log('the direction is => ', direction, this.state.userSelection, this.state.userSelection.length);
        if(!direction) {
            return;
        }
        
        //close the loop
        //const first = this.state.userSelection[0];
        //const last = this.state.userSelection[this.state.userSelection.length - 1];
        let first, last = null;
        //if(localSelection) {
            first = localSelection[0];
            last = localSelection[localSelection.length - 1];
        //}
       
        console.log('the last pos is => ', last);
        const pen = this.createThePen(direction, first, last);
        //return pen;
        //this.state.highlights.pop();
        
        const newObj= {
            id:  this.state.highlights.length ? this.state.highlights[this.state.highlights.length - 1].id : cuid(),
            points:pen
        }
        this.setState(
            (state) => {
                const lastOne = state.highlights.length ? state.highlights[state.highlights.length - 1].id : '-1'
                return {
                    highlights:[
                        ...state.highlights.filter(f => f.id !== lastOne),
                        newObj
                    ]
                }
            },
            () => {
                const ctx = this.canvas.getContext('2d');
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.loadEmojisCanvas(ctx);
                console.log('Highlighter is => ', this.state.highlights);
                this.displayHighlighter(ctx);
            }
        )
    }
    createThePen = (direction, first, last) => {
        let pen = [];
        if(direction === Directions.HR ) {
            console.log('---Entered here---');
            pen.push({
                x: first.x,
                y: first.y,
                ID: first.ID,
                Direction: direction
            });
            pen.push({
                x: last.x + 17,
                y: last.y,
                ID: last.ID,
                Direction: direction
            });
            pen.push({
                x: last.x + 17,
                y: last.y + 17,
                ID: last.ID,
                Direction: direction
            });
            pen.push({
                x: first.x,
                y: first.y + 17,
                ID:first.ID,
                Direction: direction
            })
        } else if (direction === Directions.HL) {
            console.log('---Entered Left here---');
            pen.push({
                x: first.x + 17,
                y: first.y,
                ID: first.ID,
                Direction: direction
            });
            pen.push({
                x: last.x,
                y: last.y,
                ID: last.ID,
                Direction: direction
            });
            pen.push({
                x: last.x,
                y: last.y + 17,
                ID: last.ID,
                Direction: direction
            });
            pen.push({
                x: first.x + 17,
                y: first.y + 17,
                ID:first.ID,
                Direction: direction
            })
            
        } else if(direction === Directions.VD) {
            pen.push({
                x: first.x,
                y: first.y,
                ID: first.ID,
                Direction: direction
            });
            pen.push({
                x: first.x + 17,
                y: first.y,
                ID: last.ID,
                Direction: direction
            });
            pen.push({
                x: first.x + 17,
                y: last.y + 17,
                ID: last.ID,
                Direction: direction
            });
            pen.push({
                x: last.x,
                y: last.y + 17,
                ID:first.ID,
                Direction: direction
            })
        } else if(direction === Directions.VU) {
            pen.push({
                x: first.x,
                y: first.y + 17,
                ID: first.ID,
                Direction: direction
            });
            pen.push({
                x: first.x + 17,
                y: first.y + 17,
                ID: first.ID,
                Direction: direction
            });
            pen.push({
                x: first.x + 17,
                y: last.y,
                ID: first.ID,
                Direction: direction
            });
            pen.push({
                x: first.x,
                y: last.y,
                ID: first.ID,
                Direction: direction
            });
        } else if(direction === Directions.DRD || direction === Directions.DRU) {
            console.log('---Enter right diagnonal down---');
            pen.push({
                x: first.x,
                y: first.y,
                ID: first.ID,
                Direction: direction
            });
            pen.push({
                x: first.x + (17 / 2),
                y: first.y,
                ID: first.ID,
                Direction: direction
            });
            pen.push({
                x: last.x + (17 / 2),
                y: last.y,
                ID: last.ID,
                Direction: direction
            });
            pen.push({
                x: last.x + 17,
                y: last.y,
                ID: last.ID,
                Direction: direction
            });
            pen.push({
                x: last.x + 17,
                y: last.y + 17,
                ID: last.ID,
                Direction: direction
            });
            pen.push({
                x: last.x + (17 /2),
                y: last.y + 17,
                ID: last.ID,
                Direction: direction
            });
            pen.push({
                x: first.x + (17 / 2),
                y: first.y + 17,
                ID: first.ID,
                Direction: direction
            });
            pen.push({
                x: first.x,
                y: first.y + 17,
                ID: first.ID,
                Direction: direction
            });

        } else if (direction === Directions.DLD || direction === Directions.DLU) {
            console.log('---Enter left diagnonal down---');
            pen.push({
                x: first.x + 17,
                y: first.y,
                ID: first.ID,
                Direction: direction
            });
            pen.push({
                x: first.x + (17 / 2),
                y: first.y,
                ID: first.ID,
                Direction: direction
            });
            pen.push({
                x: last.x + (17 / 2),
                y: last.y,
                ID: last.ID,
                Direction: direction
            });
            pen.push({
                x: last.x,
                y: last.y,
                ID: last.ID,
                Direction: direction
            });
            pen.push({
                x: last.x,
                y: last.y + 17,
                ID: last.ID,
                Direction: direction
            });
            pen.push({
                x: last.x + (17 /2),
                y: last.y + 17,
                ID: last.ID,
                Direction: direction
            });
            pen.push({
                x: first.x + (17 / 2),
                y: first.y + 17,
                ID: first.ID,
                Direction: direction
            });
            pen.push({
                x: first.x + 17,
                y: first.y + 17,
                ID: first.ID,
                Direction: direction
            });
        }

        return pen
    }
    loadImageSample = (ctx) => {
        let img = new Image();
        img.src = '/assets/emoji-sheet-sm.png';
        img.onload = () => {
            //imgData = data;
            console.log('Sprite sheet loaded!!!')
            this.setState(() => {
                return {
                    sheet: img
                }
            },
            () => {

            });
           this.loadDependantJsons(ctx);
        }
    }
    findEmojisByUser = () => {
        let foundEmojis = false;

        for (let i = 0; i < this.state.mockSelectedEmojis.length; i++) {
            let item = this.state.mockSelectedEmojis[i];
            let numItems = this.state.userSelection.length;
            let validate = 0;
            this.state.userSelection.forEach((val,index) => {
                let pos = item.findIndex( p => p === val.ID);
                if(pos === index) {
                    validate++;
                }
            });
            console.log('Comparing Items => ', validate, item.length)
            if(validate === item.length && item.length === numItems) {
                foundEmojis = true;
                break
            }
        }
        if(foundEmojis) {
            console.log('Emoji selection success!!!');
            this.setState(
                () => {
                    return {
                        userSelection: [],
                        timerStarted: false
                    }
                },
                () => {

                }
            )
        } else { //failed selection
            console.log('---Emoji failed----')
            const newHighlights = [...this.state.highlights];
            const lastItem = this.state.highlights[this.state.highlights.length - 1];
            this.setState(
                () => {
                    return {
                        highlights: newHighlights.filter( f => f.id !== lastItem.id),
                        userSelection: [],
                        timerStarted: false
                    }
                },
                () => {
                    const ctx = this.canvas.getContext('2d');
                    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                    this.loadEmojisCanvas(ctx);
                    this.displayHighlighter(ctx);
                }
            )
        }
    }
    loadCanvasMouseEvents = (ctx) => {
        ///mouse events
        this.canvas.onmouseup = (evt) => {
            this.setState(
                () => {
                    return {
                        isMouseDown: false
                    }
                },
                () => {

                }
            );
        }
        this.canvas.onmousedown = (evt) => {

            const pos = this.getMousePos(evt);
            if(this.state.gameMode === 'Select') {
                
                //ctx.strokeRect(pos.x,pos.y, 50, 50);
                /*if(!this.state.timerStarted) {
                    this.setState(
                        () => {
                            return{
                                timerStarted: true
                            }
                        },
                        () => {
                            setTimeout(() => {
                                this.findEmojisByUser();
                              }, 3800);
                        }
                    )
                }*/
                this.selectSingleEmoji(pos);
               
            }
             
            this.setState( () => {
                return {
                    initialDown: { x: pos.x, y: pos.y},
                    isMouseDown: true
                }
            },
            () => {

            });
        };
        this.canvas.onmousemove = (evt) => {

            if(this.state.isMouseDown && this.state.gameMode === 'Move') {
                const pos = this.getMousePos(evt);

                let deltaX = pos.x - this.state.initialDown.x;
                let deltaY = pos.y - this.state.initialDown.y;
                this.updateRectPositions(deltaX, deltaY);
                //this.updateHighlighter(deltaX, deltaY);
                this.setState( () => {
                    return {
                        initialDown: { x: pos.x, y: pos.y}
                    }
                },
                () => {

                });
                /*this.buildHighlighterBatch();
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.loadEmojisCanvas(ctx);
                this.displayHighlighter(ctx);*/
            }
        }
    }

    updateRectPositions = (deltaX, deltaY) => {
        const positionModel = [];
        this.state.positions.forEach(f => {
            positionModel.push({
                ...f,
                x: f.x + deltaX,
                y: f.y + deltaY
            })
        });
        this.setState(() => {
            return {
                positions: positionModel
            }
        },
        () => {
                const ctx = this.canvas.getContext('2d');
                this.buildHighlighterBatch();
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.loadEmojisCanvas(ctx);
                this.displayHighlighter(ctx);
        })
    }

    loadEmojisCanvas(ctx) {
        this.state.positions.forEach( f => {
           //const icon = f.split(',');
           const emojiModel = this.state.emojis.find(em => em.ID === f.EmojiID);
           if(emojiModel) {
            ctx.drawImage(this.state.sheet, emojiModel.Positions[0], emojiModel.Positions[1], emojiModel.Positions[2], emojiModel.Positions[3], f.x, f.y, emojiModel.Positions[2], emojiModel.Positions[3]);
           }
          
        });
    }

    setMode = () => {
        if(this.state.gameMode === 'Select') {
            this.setState(
                () =>{
                    return {
                        gameMode: 'Move'
                    }
                },
                () => {

                }
            )
        }
        else {
            this.setState(
                () =>{
                    return {
                        gameMode: 'Select'
                    }
                },
                () => {

                }
            )
        }
    }

    convertToModel = (strList) => {
       const items =  strList.split(',');

       return {
            ID: +items[0],
            EmojiID: +items[1],
            x: +items[2],
            y: +items[3]

       }
    }

    loadDependantJsons = (ctx) => {
        fetch('./assets/f0e8c66757ec45a2_dragon-black-sm.json')
        .then((response) => response.json())
        .then((data) => {
            
            console.log('data => ', data);
            const positionModels = []
            const splitArr = data.positions.split(' ');
            splitArr.forEach( f => {
                positionModels.push(this.convertToModel(f))
            })
            this.setState(() => {
                return {
                    positions: positionModels
                }
            },
            () => {

            })

            fetch('./assets/emojis-UI.json')
            .then((emojis) => emojis.json())
            .then((raw) => {
                //console.log('emojis => ', raw);
                this.setState(() => {
                    return {
                        emojis: raw
                    }
                },
                () => {
                    console.log('The state is => ', this.state)
                    this.loadEmojisCanvas(ctx);
                    this.displayMarkedEmojis();
                })
            })
      
       })
    }
    drawCircleNumber = (xPos, yPos, iter) => {
        const ctx2 = this.canvasSm.getContext('2d');
        ctx2.save();
        ctx2.fillStyle = "#000000";
        ctx2.beginPath();
        ctx2.arc(xPos-10, yPos-6, 6, 0, 2 * Math.PI);
        ctx2.fill();
        ctx2.font = "8px serif";
        ctx2.fillStyle="white";
        ctx2.fillText(iter, xPos-12, yPos-4);
        ctx2.restore();
    }
    displayMarkedEmojis = () => {
        const ctx2 = this.canvasSm.getContext('2d');
        let scaleFactor = 1.3;
        let xPos = 30;
        let yPos = 30;
        ctx2.scale(scaleFactor, scaleFactor);
        this.state.mockSelectedEmojis.forEach((val,index) => {
            this.drawCircleNumber(xPos, yPos, index+1);
            val.forEach((item) => {
                console.log('the item is => ', item);
                const pos = this.state.positions.find( f => f.ID === item);
                const emojiModel = this.state.emojis.find(em => em.ID === pos.EmojiID);
                
                if(emojiModel) {
                 ctx2.drawImage(this.state.sheet, emojiModel.Positions[0], emojiModel.Positions[1], emojiModel.Positions[2], emojiModel.Positions[3], xPos, yPos, emojiModel.Positions[2], emojiModel.Positions[3]);
                 xPos += 20;
                }
            });
          
        })
    }
    componentDidMount() {
        const ctx = this.canvas.getContext('2d');
        this.loadCanvasMouseEvents(ctx);
        //this.loadDependantJsons();
        this.loadImageSample(ctx);
        this.setState(
            () => {
                return {
                    mockSelectedEmojis:[
                       [646,716, 786, 856]
                    ]
                }
            },
            () => {
                //this.displayMarkedEmojis();
            }
        )
    }

    render() {
        const {width, height} = this.props
        const widthSm = width - 200;
        const heightSm = height - 550;
        return (
                <div>
                    <div>
                        <canvas width={widthSm} height={heightSm} ref={node => (this.canvasSm = node)} />
                    </div>
                    <div className="parent-control">
                        <canvas width={width} height={height} ref={node => (this.canvas = node )} />
                        <div>
                            <Button color='teal' content={this.state.gameMode}  onClick={() => this.setMode() }  floated='right' size='large' />
                        </div>
                    </div>
                </div>
            )
    }
   
} 