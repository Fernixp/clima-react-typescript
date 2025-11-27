
import { useState } from "react";
import { countries } from "../../data/countries";
import styles from "./Form.module.css";
import type { SearchType } from "../../types";

export default function Form() {

    const [search, setSearch] = useState<SearchType>({
        city: '',
        country: ''
    })
    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>)=>{
        setSearch({
            ...search,
            [e.target.name]: e.target.value
        })
    }
    return (
        <form className={styles.form}>
            <div className={styles.field}>
                <label htmlFor="city">Ciudad:</label>
                <input type="text" id="city" name="city"
                    placeholder="Ciudad" value={search.city}
                    onChange={handleChange} />
            </div>
            <div className={styles.field}>
                <label htmlFor="country">País:</label>
                <select id="country" name="country" value={search.country}
                    onChange={handleChange}>
                    <option value="">--- Seleccione un país ---</option>
                    {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>
            <input className={styles.submit} type="submit" value="Consultar Clima" />

        </form>
    )
}