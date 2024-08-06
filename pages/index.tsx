import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/Header/Header";
import { links } from "../constants/links"
import styles from "@/styles/Home.module.css";
import React , { useEffect, useState } from "react";
import { GroupType } from "../types/group";
import axios from "axios";
import GroupCardWrapper from ".././components/GroupWrapper/GroupWrapper";

const Index = () => {
  const [groups, setGroups] = useState<GroupType[] | null>(null);
  const fetchGroups = async () => {
    try{

      const response = await axios.get(`${process.env.SERVER_URL}/groups`)

      setGroups(response.data.groups);
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  return(
    <>
    <Header WebTitle={"Reddit"} links={links} />
    {groups && <GroupCardWrapper groups={groups} />}
    </>
  )
}

export default Index;