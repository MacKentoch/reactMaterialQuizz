import React 										from 'react';
import ReactCSSTransitionGroup 	from 'react-addons-css-transition-group'
import StaticContainer 					from 'react-static-container'


/**
 * <RouteCSSTransitionGroup> renders twice on a route change. On the first
 * render, it "freezes" the transitioning-out component by setting
 * `shouldUpdate` on the <StaticContainer> to `false`. This prevents any
 * <Link>s nested under the old component from updating their active state to
 * reflect the new location, to allow for a smooth transition out. It then
 * renders the new, transitioning-in component immediately afterward.
 */
class RouteCSSTransitionGroup extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      previousPathname: null
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextContext.location.pathname !== this.context.location.pathname) {
      this.setState({ previousPathname: this.context.location.pathname })
    }
  }

  render() {
    const { children, ...props } = this.props
    const { previousPathname } = this.state

    return (
      <ReactCSSTransitionGroup {...props}>
        <StaticContainer
          key={previousPathname || this.context.location.pathname}
          shouldUpdate={!previousPathname}
        >
          {children}
        </StaticContainer>
      </ReactCSSTransitionGroup>
    )
  }

  componentDidUpdate() {
    if (this.state.previousPathname) {
      this.setState({ previousPathname: null })
    }
  }
}


RouteCSSTransitionGroup.contextTypes = {
  location: React.PropTypes.object
}