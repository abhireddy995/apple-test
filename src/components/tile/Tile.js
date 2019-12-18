import React from "react";
import "./Tile.css";

class Tile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isHover: false
        };
    }

    handleMouseEnter = () => {
        this.setState({
            isHover: true
        });
    }

    handleMouseLeave = () => {
        this.setState({
            isHover: false
        });
    }

    render() {
        const { item, type } = this.props;
        const { isHover } = this.state;
        return (
            <div className="tile" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
                <div className="tile-img">
                    <figure>
                        <img src={item.img} alt={item.title} />
                    </figure>
                    <figcaption>{item.title}</figcaption>
                </div>
                <div className="action-container">
                    {type === "mylist" && isHover && <button className="btn btn-remove" onClick={() => this.props.handleRemove(item)}>Remove</button>}
                    {type === "recommendation" && isHover && <button className="btn btn-add" onClick={() =>this.props.handleAdd(item)}>Add</button>}
                </div>
            </div>
        )
    }
}

export default Tile;