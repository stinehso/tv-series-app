import React from 'react'

function Table({ headers, shows, showProps }) {
    showProps = Object.keys(shows[0]);

    return (
        <div class="pa4">
            <div class="overflow-auto">
                <table class="f6 w-100 mw8 center" cellspacing="0">
                <thead>
                    <tr>
                        {
                            headers.map((heading, i) => {
                                return (
                                    <th class="fw6 bb b--black-20 tl pb3 pr3 bg-white">{heading}</th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody class="lh-copy">
                    {
                        shows.map((show, i) => {
                            return (
                                <tr>
                                {
                                    Object.keys(show).map((keyName, i) => (
                                        <td class="pv3 pr3 bb b--black-20">{show[keyName]}</td>
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
