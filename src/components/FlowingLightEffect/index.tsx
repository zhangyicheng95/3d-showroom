function FlowingLightEffect(props: any) {
    const { className, ...rest } = props;

    return <div className={`ellipse ${className}`} {...rest}>
        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="circle circle3"></div>
        <div className="circle circle4"></div>
    </div>;
}

export default FlowingLightEffect;
