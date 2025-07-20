export interface PhysiologyItem {
  id: string
  text: string
}

export interface PhysiologySection {
  id: string
  title: string
  items: PhysiologyItem[]
}

export const physiologyData: PhysiologySection[] = [
  {
    id: 'cellular-tissue',
    title: '1. Клеточное и тканевое строение',
    items: [
      {
        id: 'cell-structure',
        text: 'Строение клетки: мембрана, цитоплазма, митохондрии, ЭПС, КГ, лизосомы, пероксисомы, клеточный центр, цитоскелет, ядро, гликокаликс, ионы'
      },
      {
        id: 'membrane-transport',
        text: 'Транспорт веществ через мембрану: пассивный (простая диффузия, облегченная диффузия, осмос), активный (белки переносчики, везикулярный транспорт)'
      },
      {
        id: 'epithelial-tissue',
        text: 'Эпителиальная ткань: покровная и железистая'
      },
      {
        id: 'internal-environment-tissue',
        text: 'Ткань внутренней среды: соединительная, кровь и лимфа, костная, хрящевая'
      },
      {
        id: 'nervous-tissue',
        text: 'Нервная ткань: нейроны и глия'
      },
      {
        id: 'muscle-tissue',
        text: 'Мышечная ткань'
      },
      {
        id: 'physiological-systems',
        text: 'Физиологические системы'
      }
    ]
  },
  {
    id: 'muscles',
    title: '2. Мышцы',
    items: [
      {
        id: 'muscle-fiber-types',
        text: 'Виды мышечных волокон: поперечно-полосатые скелетные и сердечные. Их общее строение, функции и свойства'
      },
      {
        id: 'extrafusal-intrafusal',
        text: 'Экстрафузальные и интрафузальные волокна'
      },
      {
        id: 'molecular-structure',
        text: 'Молекулярное строение поперечно-полосатого мышечного волокна'
      },
      {
        id: 'contraction-mechanism',
        text: 'Механизм мышечного сокращения'
      },
      {
        id: 'muscle-work-fatigue',
        text: 'Работа и утомление мышц'
      }
    ]
  },
  {
    id: 'internal-environment',
    title: '3. Внутренняя среда',
    items: [
      {
        id: 'tissue-fluid-lymph-blood',
        text: 'Тканевая жидкость, лимфа, кровь'
      },
      {
        id: 'lymph-circulation',
        text: 'Физиология лимфообращения и механизмы движения лимфы'
      }
    ]
  },
  {
    id: 'blood',
    title: '4. Кровь',
    items: [
      {
        id: 'blood-functions',
        text: 'Основные функции'
      },
      {
        id: 'blood-composition',
        text: 'Состав, количество и физико-химические свойства крови'
      },
      {
        id: 'blood-antigens',
        text: 'Антигенные свойства крови'
      },
      {
        id: 'immune-function',
        text: 'Иммунная функция крови. Иммунная система'
      }
    ]
  },
  {
    id: 'circulatory-system',
    title: '5. Кровеносная система',
    items: [
      {
        id: 'circulation-characteristics',
        text: 'Общая характеристика системы кровообращения'
      },
      {
        id: 'heart-physiology',
        text: 'Физиология сердца. Насосная функция миокарда. Свойства сердечной мышцы. Автоматия сердца'
      },
      {
        id: 'cardiac-cycle',
        text: 'Сердечный цикл и его фазы'
      },
      {
        id: 'ecg-analysis',
        text: 'ЭКГ и принципы ее анализа'
      },
      {
        id: 'heart-regulation',
        text: 'Регуляция деятельности сердца'
      },
      {
        id: 'hemodynamics-laws',
        text: 'Законы гемодинамики'
      },
      {
        id: 'arterial-pressure',
        text: 'Артериальное давление, артериальный пульс. Сфигмография'
      }
    ]
  },
  {
    id: 'respiratory-system',
    title: '6. Дыхательная система',
    items: [
      {
        id: 'cellular-respiration',
        text: 'Дыхание на клеточном уровне'
      },
      {
        id: 'pulmonary-ventilation',
        text: 'Легочная вентиляция. Спирометрия'
      },
      {
        id: 'ventilation-regulation',
        text: 'Регуляция вентиляции легких'
      },
      {
        id: 'gas-diffusion',
        text: 'Диффузия газов через аэрогематический барьер'
      },
      {
        id: 'gas-transport',
        text: 'Транспорт кислорода и углекислого газа'
      },
      {
        id: 'altered-conditions',
        text: 'Дыхание в измененных условиях деятельности'
      }
    ]
  },
  {
    id: 'digestive-system',
    title: '7. Пищеварительная система',
    items: [
      {
        id: 'digestive-functions',
        text: 'Функции пищеварительного тракта (секреция, всасывание, моторная функция)'
      },
      {
        id: 'study-methods',
        text: 'Методы изучения пищеварительных функций'
      },
      {
        id: 'digestive-regulation',
        text: 'Регуляция пищеварительных функции'
      },
      {
        id: 'secretion-phases',
        text: 'Фазы секреции пищеварительных желез'
      },
      {
        id: 'oral-digestion',
        text: 'Пищеварение в полости рта и глотание'
      },
      {
        id: 'gastric-digestion',
        text: 'Пищеварение в желудке. Секреторная функция желудка. Состав и свойства желудочного сока'
      },
      {
        id: 'small-intestine-digestion',
        text: 'Пищеварение в тонкой кишке. Секреция и регуляция секреции поджелудочной железы'
      },
      {
        id: 'liver-bile',
        text: 'Печень. Строение. Состав и образование желчи. Регуляция желчеобразования'
      },
      {
        id: 'cavity-parietal-digestion',
        text: 'Полостное и пристеночное пищеварение в тонкой кишке'
      },
      {
        id: 'small-intestine-motility',
        text: 'Двигательная функция тонкой кишки'
      },
      {
        id: 'absorption',
        text: 'Всасывание различных веществ в тонкой кишке'
      },
      {
        id: 'large-intestine',
        text: 'Толстый кишечник'
      }
    ]
  },
  {
    id: 'excretory-system',
    title: '8. Выделительная система',
    items: [
      {
        id: 'kidney-functions',
        text: 'Основные функции почек'
      },
      {
        id: 'nephron',
        text: 'Нефрон как морфофункциональная единица почек'
      },
      {
        id: 'urine-formation',
        text: 'Механизмы и регуляция образования мочи. Клубочковая фильтрация. Канальцевая реабсорбция'
      },
      {
        id: 'tubular-secretion',
        text: 'Канальцевая секреция. Осмотическое разведение и концентрирование мочи'
      },
      {
        id: 'homeostatic-function',
        text: 'Гомеостатическая функция почек. Поддержание ионного равновесия'
      },
      {
        id: 'fluid-regulation',
        text: 'Регуляция объема жидкости'
      },
      {
        id: 'ionic-acid-base',
        text: 'Регуляция ионного состава крови и кислотно-основного состояния'
      },
      {
        id: 'blood-pressure-regulation',
        text: 'Роль почек в регуляции давления крови'
      }
    ]
  },
  {
    id: 'energy-metabolism',
    title: '9. Энергетический обмен',
    items: [
      {
        id: 'energy-exchange-basics',
        text: 'Физиологические основы обмена энергии в организме'
      },
      {
        id: 'energy-assessment-methods',
        text: 'Методы оценки энерготрат'
      },
      {
        id: 'basal-metabolism',
        text: 'Основной обмен. Энерготраты при физическом и умственном труде'
      }
    ]
  },
  {
    id: 'nervous-system',
    title: '10. Нервная система',
    items: [
      {
        id: 'nervous-structure-functions',
        text: 'Строение и функции нервной системы'
      },
      {
        id: 'nervous-classification',
        text: 'Классификация НС'
      },
      {
        id: 'autonomic-nervous',
        text: 'Вегетативная нервная система и ее роль в регуляции гомеостаза'
      }
    ]
  },
  {
    id: 'thermoregulation',
    title: '11. Терморегуляция',
    items: [
      {
        id: 'chemical-physical-thermoregulation',
        text: 'Химическая терморегуляция и физическая терморегуляция'
      },
      {
        id: 'hypothalamic-mechanisms',
        text: 'Гипоталамические механизмы регуляции температуры тела'
      }
    ]
  },
  {
    id: 'reproductive-system',
    title: '12. Половая система',
    items: [
      {
        id: 'reproductive-structure-functions',
        text: 'Строение и функции'
      }
    ]
  },
  {
    id: 'endocrine-system',
    title: '13. Эндокринная система',
    items: [
      {
        id: 'hormone-effects',
        text: 'Эффекты гормонов. Химическая классификация гормонов'
      },
      {
        id: 'hormone-mechanisms',
        text: 'Механизмы действия гормонов'
      },
      {
        id: 'hypothalamus-pituitary',
        text: 'Гипоталамус, гипофиз и эпифиз'
      },
      {
        id: 'thyroid-parathyroid',
        text: 'Щитовидная и паращитовидная железа'
      },
      {
        id: 'pancreas-endocrine',
        text: 'Поджелудочная железа'
      },
      {
        id: 'adrenal-glands',
        text: 'Корковое и мозговое вещество надпочечников'
      },
      {
        id: 'sex-glands',
        text: 'Мужские и женские половые железы'
      }
    ]
  },
  {
    id: 'regulation',
    title: '14. Регуляция физиологических функций',
    items: [
      {
        id: 'self-regulation',
        text: 'Саморегуляция'
      },
      {
        id: 'nervous-regulation',
        text: 'Нервная регуляция'
      },
      {
        id: 'endocrine-regulation',
        text: 'Эндокринная регуляция'
      },
      {
        id: 'immune-regulation',
        text: 'Иммунная регуляция'
      },
      {
        id: 'control-principles',
        text: 'Принципы и механизмы управления в живых системах. Обратная связь'
      }
    ]
  }
]