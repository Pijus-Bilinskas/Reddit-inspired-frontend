import { Inter } from "next/font/google";
import PageTemplate from "../components/PageTemplate/PageTemplate";
import styles from "@/styles/Home.module.css";
import React , { useEffect, useState } from "react";
import { GroupType } from "../types/group";
import axios from "axios";
import GroupCardsWrapper from ".././components/GroupWrapper/GroupWrapper";

const Index = () => {
  const [groups, setGroups] = useState<GroupType[] | null>(null);
  const fetchGroups = async () => {
    try{
      const response = await axios.get(`${process.env.SERVER_URL}/groups`);
      console.log("API response" ,response);
      if(response.data.groups){
        setGroups(response.data.groups);
        console.log("Group set", response.data.groups)
      } else {
        console.log(`Invlaid API response`, response.data)
      }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchGroups();
  }, []);

  return(
   <PageTemplate>
    {groups && <GroupCardsWrapper groups={groups} />}
    </PageTemplate>
  )
}

export default Index;