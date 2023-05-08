import Weather from "./Weather"

const Country = ({ selectedCountry: { name, capital, area, languages, demonyms, flags} }) => {

    const languagesArray = Object.values(languages)
    const imageAlt = `${demonyms.eng.f} flag`

    return(
            <>
                <h1>{name.common}</h1>
                <p>capital {capital}</p>
                <p>area {area}</p>
                <h2>languages</h2>
                <ul> 
                    {
                        languagesArray.map((lang) =>{
                            return(
                                <li key={lang}>{lang}</li>
                            )
                        })
                    }
                </ul>
             
                <img src={flags.svg} alt={imageAlt} width="200" height="200" />
                <p>{imageAlt}</p>

                <Weather capital={capital} />
   
            </>
    )
}


export default Country

