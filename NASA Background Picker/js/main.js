document.querySelector('#cloudNebula').addEventListener('click', showCloudNebula)
document.querySelector('#galaxyClusters').addEventListener('click', showGalaxyClusters)
document.querySelector('#pentaGalaxies').addEventListener('click', showPentaGalaxies)
document.querySelector('#southernRNebula').addEventListener('click', showSouthernRNebula)
document.querySelector('#speckledSField').addEventListener('click', showSpeckledSField)


function showCloudNebula() {
    document.querySelector('body').style.cssText = 'background-image: url("./images/cockpit.png"), url("./images/cloudscape nebula.png") ; background-repeat: no-repeat, no-repeat; background-position: center center, center center; '
    // document.querySelector('body').style.backgroundImage = 'url("./images/cloudscape nebula.png"), url("./images/cockpit.png")'
    // document.querySelector('body').style.backgroundRepeat = 'no-repeat, no-repeat'
    // document.querySelector('body').style.position = 'center center, center center'
    // document.querySelector('body').style.backgroundSize = 'cover, cover'
}

function showGalaxyClusters() {
    document.querySelector('body').style.cssText = 'background-image: url("./images/cockpit.png"), url("./images/galaxy clusters.png") ; background-repeat: no-repeat, no-repeat; background-position: center center, center center; '
    // document.querySelector('body').style.background = 'url("./images/galaxy clusters.png") no-repeat center center fixed'
    // document.querySelector('body').style.backgroundSize = 'cover'
}
function showPentaGalaxies() {
    document.querySelector('body').style.cssText = 'background-image: url("./images/cockpit.png"), url("./images/penta galaxies.png") ; background-repeat: no-repeat, no-repeat; background-position: center center, center center; '
    // document.querySelector('body').style.background = 'url("./images/penta galaxies.png") no-repeat center center fixed'
    // document.querySelector('body').style.backgroundSize = 'cover'
}
function showSouthernRNebula() {
    document.querySelector('body').style.cssText = 'background-image: url("./images/cockpit.png"), url("./images/southern ring nebula.png") ; background-repeat: no-repeat, no-repeat; background-position: center center, center center; '
    // document.querySelector('body').style.background = 'url("./images/southern ring nebula.png") no-repeat center center fixed'
    // document.querySelector('body').style.backgroundSize = 'cover'
}
function showSpeckledSField() {
    document.querySelector('body').style.cssText = 'background-image: url("./images/cockpit.png"), url("./images/speckled star field.png") ; background-repeat: no-repeat, no-repeat; background-position: center center, center center; '
    // document.querySelector('body').style.background = 'url("./images/speckled star field.png") no-repeat center center fixed'
    // document.querySelector('body').style.backgroundSize = 'cover'
}