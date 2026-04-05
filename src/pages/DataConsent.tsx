import { useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import SEO from '../components/SEO';

const DataConsent = () => {
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-royal-black text-white pt-32 pb-20">
      <SEO title={language === 'ru' ? 'Согласие на обработку персональных данных | Royal Event Group' : 'Personal Data Processing Consent | Royal Event Group'} />
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tighter leading-none mb-12">
          {language === 'ru' ? 'Согласие на обработку персональных данных' : 'Personal Data Processing Consent'}
        </h1>

        <div className="prose prose-invert prose-lg max-w-none space-y-8 text-white/70 leading-relaxed">
          {language === 'ru' ? (
            <>
              <p>
                Физическое лицо, оставляя заявку на веб-сайте{' '}
                <a href="https://www.royaleventandmice.com" className="text-royal-pink hover:underline">https://www.royaleventandmice.com</a>{' '}
                через формы обратной связи, действуя свободно, своей волей и в своём интересе, а также подтверждая свою дееспособность, предоставляет своё согласие на обработку персональных данных (далее — Согласие) Индивидуальному предпринимателю Усачевой Ксении Олеговне, ИНН: 772206846997, ОГРНИП: 324774600436282, адрес регистрации: г. Москва, ул. Шепелюгинская, д. 5, к. 1, кв. 91 (далее — Оператор), которому принадлежит веб-сайт, со следующими условиями:
              </p>

              <p>Данное Согласие даётся на обработку персональных данных, как без использования средств автоматизации, так и с их использованием.</p>

              <p>Согласие даётся на обработку следующих моих персональных данных, не являющихся специальными или биометрическими:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Имя; номер телефона; адрес электронной почты.</li>
              </ul>

              <p>Обезличенных пользовательских данных, предоставляемых пользователем автоматически при посещении сайта, собираемых Оператором с помощью метрической программы Яндекс.Метрика, а именно:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Техническая информация (IP-адрес, тип браузера, версия ОС, характеристики устройства).</li>
                <li>Данные о взаимодействии с сайтом (посещённые страницы, время сессии, клики, переходы по ссылкам).</li>
                <li>Источники трафика (например, переходы с поисковых систем или рекламных кампаний).</li>
                <li>Геолокация (на уровне региона, без точной привязки к местоположению).</li>
              </ul>

              <p><strong className="text-white">Цель обработки персональных данных:</strong> консультация.</p>

              <p>В ходе обработки с персональными данными будут совершены следующие действия: сбор; запись; систематизация; накопление; хранение; уточнение (обновление, изменение); извлечение; использование; передача (предоставление, доступ); блокирование; удаление; уничтожение.</p>

              <p>Оператор вправе привлекать для обработки персональных данных третьих лиц (исполнителей), а также вправе передавать персональные данные для обработки своим контрагентам, в том числе для достижения целей, указанных в настоящем Согласии, при обеспечении такими лицами конфиденциальности и безопасности обрабатываемых данных. С актуальным перечнем третьих лиц и целями обработки можно ознакомиться в Политике Оператора в отношении обработки персональных данных.</p>

              <p>Персональные данные обрабатываются до отказа в дальнейшем обсуждении сотрудничества или до заключения договора, смотря что произойдёт быстрее.</p>

              <p>Согласие может быть отозвано вами или вашим представителем путём направления письменного заявления по адресу, указанному в начале Согласия, либо на электронную почту{' '}
                <a href="mailto:baxgat@yandex.ru" className="text-royal-pink hover:underline">baxgat@yandex.ru</a>.
              </p>

              <p>В случае отзыва вами или вашим представителем Согласия Оператор вправе продолжить обработку персональных данных без него при наличии оснований, указанных в пунктах 2–11 части 1 статьи 6, части 2 статьи 10 и части 2 статьи 11 Федерального закона № 152-ФЗ «О персональных данных» от 27.07.2006 г.</p>

              <p>Настоящее согласие действует всё время до момента прекращения обработки персональных данных, указанных в п. 3 и п. 6 настоящего Согласия, либо до его отзыва в порядке, предусмотренном п. 7.</p>
            </>
          ) : (
            <>
              <p>
                An individual, by submitting a request on the website{' '}
                <a href="https://www.royaleventandmice.com" className="text-royal-pink hover:underline">https://www.royaleventandmice.com</a>{' '}
                through feedback forms, acting freely, of their own will and in their own interest, and confirming their legal capacity, provides consent to the processing of personal data (hereinafter — Consent) to Individual Entrepreneur Usacheva Ksenia Olegovna, INN: 772206846997, OGRNIP: 324774600436282, registered address: Moscow, Shepelyuginskaya st., 5, bldg. 1, apt. 91 (hereinafter — the Operator), who owns the website, under the following terms:
              </p>

              <p>This Consent is given for the processing of personal data both without and with the use of automation tools.</p>

              <p>Consent is given for the processing of the following personal data that is not special or biometric:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name; phone number; email address.</li>
              </ul>

              <p>Anonymized user data provided automatically when visiting the site, collected by the Operator using the Yandex.Metrica analytics program, namely:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Technical information (IP address, browser type, OS version, device characteristics).</li>
                <li>Website interaction data (pages visited, session time, clicks, link transitions).</li>
                <li>Traffic sources (e.g., transitions from search engines or advertising campaigns).</li>
                <li>Geolocation (at the regional level, without precise location tracking).</li>
              </ul>

              <p><strong className="text-white">Purpose of personal data processing:</strong> consultation.</p>

              <p>During processing, the following actions will be performed with personal data: collection; recording; systematization; accumulation; storage; clarification (updating, modification); extraction; use; transfer (provision, access); blocking; deletion; destruction.</p>

              <p>The Operator has the right to engage third parties (contractors) for personal data processing, as well as to transfer personal data for processing to its counterparties, including for achieving the purposes specified in this Consent, provided that such parties ensure the confidentiality and security of the processed data. The current list of third parties and processing purposes can be found in the Operator's Personal Data Processing Policy.</p>

              <p>Personal data is processed until a refusal to further discuss cooperation or until a contract is concluded, whichever occurs first.</p>

              <p>Consent may be revoked by you or your representative by sending a written statement to the address specified at the beginning of the Consent, or by email to{' '}
                <a href="mailto:baxgat@yandex.ru" className="text-royal-pink hover:underline">baxgat@yandex.ru</a>.
              </p>

              <p>In the event of revocation of Consent by you or your representative, the Operator has the right to continue processing personal data without it if there are grounds specified in paragraphs 2–11 of part 1 of Article 6, part 2 of Article 10, and part 2 of Article 11 of Federal Law No. 152-FZ "On Personal Data" dated July 27, 2006.</p>

              <p>This consent is valid for the entire period until the cessation of personal data processing specified in paragraphs 3 and 6 of this Consent, or until its revocation in the manner provided in paragraph 7.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataConsent;
