function copyURL(evt) {
  evt.preventDefault();
  navigator.clipboard.writeText(evt.target.getAttribute('href'))
      .then(
          () => {
            /* clipboard successfully set */
            alert('Copied the text: ' + evt.target.getAttribute('href'));
          },
          () => {
            /* clipboard write failed */
            alert('Copy failed.');
          });
}
