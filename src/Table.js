import React from 'react'

function Table({ headers, shows }) {
    //showProps = Object.keys(shows[0]);

    return (
        <div className="pa4">
          <div className="overflow-auto">
            <table className="f6 w-100 mw8 center" cellSpacing="0">
              <thead>
                <tr>
                  {
                    headers.map((heading, i) => {
                      return (
                        <th className="fw6 bb b--black-20 tl pb3 pr3 bg-white tc"
                            id={`header${i}`}>{heading}</th>
                      )
                    })
                  }
                </tr>
              </thead>
              <tbody className="lh-copy">
                {
                  shows.map((show, i) => {
                    return (
                      <tr>
                        {
                          Object.keys(show).map((keyName, i) => (
                            <td className="pv3 pr3 bb b--black-20 tc">{show[keyName]}</td>
                          ))
                        }
                      </tr>
                    )    
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
    )
}

export default Table
