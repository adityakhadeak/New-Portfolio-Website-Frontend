import React, { useState } from 'react'
import FetchContext from '../../Context/FetchContext'
import { BASE_URL } from '../../helper'
const FetchAll = (props) => {

    const [Paras, setParas] = useState([])
    const [Edus, setEdus] = useState([])
    const [Exps, setExps] = useState([])
    const [Skills, setSkills] = useState([])
    const [Cers, setCers] = useState([])
    const [Projects, setProjects] = useState([])
    const [UserDetails, setUserDetails] = useState([])

    const fetchAboutParas = async () => {
        const response = await fetch(`${BASE_URL}/api/about/fetchabout`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
             }
        })
        const res = await response.json()
        if (res.success) {
            setParas(res.data)
        }

    }


    const fetchEdus = async () => {
        const response = await fetch(`${BASE_URL}/api/edu/fetchedu`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
             }
        })
        const res = await response.json()
        if (res.success) {
            setEdus(res.data)
        }
    }


    const fetchExps = async () => {
        const response = await fetch(`${BASE_URL}/api/exp/fetchexp`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
             }
        })
        const res = await response.json()
        
        if (res.success) {
            setExps(res.data.reverse())
        }
    }


    const fetchAllSkills = async () => {
        const response = await fetch(`${BASE_URL}/api/skill/fetchskills`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
             }
        })
        const res = await response.json()
        if (res.success) {
            setSkills(res.data)
        }
    }

    const fetchAboutCers = async () => {
        const response = await fetch(`${BASE_URL}/api/cer/fetchcertificates`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
             }
        })
        const res = await response.json()
        if (res.success) {
            setCers(res.data)
        }
    }

    const fetchAllProjects = async () => {
        const response = await fetch(`${BASE_URL}/api/project/fetchprojects`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
             }
        })
        const res = await response.json()
        if (res.success) {
            let projs=res.data
            setProjects(projs.reverse())        }
    }
    const fetchUserDetails = async () => {
        const response = await fetch(`${BASE_URL}/api/user/fetchuserdetails`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        const res = await response.json()
        if (res.success) {
            setUserDetails(res.data)
        }
    }
    return (
        <FetchContext.Provider value={{fetchAboutCers,fetchAboutParas,fetchAllProjects,fetchAllSkills,fetchEdus,fetchExps,fetchUserDetails,Paras,Edus,Exps,Skills,Cers,Projects,UserDetails}}>
            {props.children}
        </FetchContext.Provider>
    )
}

export default FetchAll
