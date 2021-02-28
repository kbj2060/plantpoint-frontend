import React from "react";
import useSubscribeEnvironmentStatus from "@hooks/useSubscribeEnvironmentStatus";
import {AvailableEnvironment, AvailableEnvironmentSection} from "@interfaces/main";

interface EnvironmentTextProps {
  name: AvailableEnvironment;
  section: AvailableEnvironmentSection
}

const EnvironmentText = ({ section, name }: EnvironmentTextProps) => {
  const { Units } = require('@values/units');
  const value = useSubscribeEnvironmentStatus(section, name)

  return (
    <div>
      <span className='environment'>{value}{Units[name]}</span>
    </div>
  )
}

export default React.memo(EnvironmentText);