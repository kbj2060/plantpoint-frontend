export class EnvironmentSection {
  section: string;
  constructor(section: string) {
    this.section = section;
  }
}

export class MachineSection {
  section: string;
  constructor(section: string) {
    this.section = section;
  }
}

export class Section {
  m_section: MachineSection;
  e_sections: EnvironmentSection[];
  constructor(m_section: MachineSection, e_sections: EnvironmentSection[]) {
    this.m_section = m_section;
    this.e_sections = e_sections;
  }
}
