import React, { Component } from 'react';

class Scroller extends Component {

    scrollUp = () => {
        const allSections = [
          'containAbout',
          'containProjects',
          'containSkills',
          'containEducation',
          'containContact'
        ];
        const expandedSections = allSections.filter(s => {
          //filter out unexpanded sections
          return document.getElementById(s);
        });
        if (!expandedSections.length) {
          //all sections arecollapsed
          return;
        } 
        const scrollSection = expandedSections.filter(section => {
          //filter out last section inside of viewport
          const boundingBox = document
            .getElementById(section)
            .getBoundingClientRect();
          return !(boundingBox.bottom < 0 || boundingBox.top > window.innerHeight);
        }).pop();
    
        //get section name to send to scroller
        const sectionName = scrollSection
          .split('contain')[1]
          .toLowerCase();
        //get bounding of section
        const sectionBounding = document
          .getElementById(scrollSection)
          .getBoundingClientRect();
        //console.log(sectionName,sectionBounding,window.innerHeight)
        if (sectionBounding.top > 200 && sectionBounding.top < 202) {
          //already scrolled up(100 = section heading height, 75 main header height)
          this.props.hideByScroller(sectionName); //if already scrolled up just hide
        } 
        else if(sectionBounding.top > 200 && sectionBounding.height + 200 < window.innerHeight){
          //console.log("contained in view Port!")
          //console.log(sectionName,sectionBounding,window.innerHeight)
          this.props.hideByScroller(sectionName);
        }
        else{
          this.props.scrollTo(sectionName);
        }
      }

    controlScroll (){
        if (this.props.pageState.hiddenSection.length === 5 || 
            this.props.pageState.lastScrollTime > 50 || 
            this.props.pageState.yScroll[1]==="down") {
          return null;
        }
        const scrollerButton = (
          <div className="scroller" onClick={this.scrollUp}>
            <i className="fas fa-hand-point-up" />
          </div>
        );
    
        return scrollerButton;
      }

    render() {
        return (
            <div>
                {this.controlScroll()}
            </div>
        );
    }
}

export default Scroller;