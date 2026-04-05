import { useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import SEO from '../components/SEO';

const Offer = () => {
  const { language } = useLanguage();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-royal-black text-white pt-32 pb-20">
      <SEO title={language === 'ru' ? 'Договор оферты | Royal Event Group' : 'Public Offer Agreement | Royal Event Group'} />
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl sm:text-5xl font-display font-black uppercase tracking-tighter leading-none mb-12">
          {language === 'ru' ? 'Договор оферты' : 'Public Offer Agreement'}
        </h1>

        <div className="prose prose-invert prose-lg max-w-none space-y-8 text-white/70 leading-relaxed">
          {language === 'ru' ? (
            <>
              <section>
                <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">1. Общие положения</h2>
                <p>1.1. Настоящий документ является официальным предложением (публичной офертой) Индивидуального предпринимателя Усачевой Ксении Олеговны, ИНН: 772206846997, ОГРНИП: 324774600436282, адрес регистрации: г. Москва, ул. Шепелюгинская, д. 5, к. 1, кв. 91 (далее — «Исполнитель»), адресованным физическим и юридическим лицам (далее — «Заказчик»), и содержит все существенные условия оказания услуг по организации мероприятий.</p>
                <p>1.2. В соответствии с пунктом 2 статьи 437 Гражданского Кодекса Российской Федерации, данный документ является публичной офертой, и в случае принятия изложенных ниже условий лицо, производящее акцепт настоящей оферты, становится Заказчиком.</p>
                <p>1.3. Акцептом настоящей оферты является оплата услуг Исполнителя либо заполнение и отправка формы заявки на сайте <a href="https://www.royaleventandmice.com" className="text-royal-pink hover:underline">https://www.royaleventandmice.com</a> с отметкой о согласии с условиями оферты.</p>
                <p>1.4. Полным и безоговорочным акцептом настоящей публичной оферты считается осуществление Заказчиком оплаты предложенных Исполнителем услуг.</p>
              </section>

              <section>
                <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">2. Предмет оферты</h2>
                <p>2.1. Исполнитель обязуется оказать Заказчику услуги по организации мероприятий (далее — «Услуги»), а Заказчик обязуется оплатить эти услуги в порядке и на условиях, предусмотренных настоящей офертой.</p>
                <p>2.2. Наименование, объём, стоимость и сроки оказания Услуг определяются на основании заявки Заказчика и согласовываются сторонами в дополнительном соглашении (спецификации), являющемся неотъемлемой частью настоящего договора.</p>
              </section>

              <section>
                <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">3. Стоимость услуг и порядок расчётов</h2>
                <p>3.1. Стоимость Услуг определяется Исполнителем и сообщается Заказчику посредством выставления счёта или коммерческого предложения.</p>
                <p>3.2. Оплата производится в рублях РФ путём безналичного перевода на расчётный счёт Исполнителя.</p>
                <p>3.3. Предоплата составляет 50% от стоимости Услуг и вносится Заказчиком в течение 5 (пяти) рабочих дней с момента выставления счёта. Оставшиеся 50% оплачиваются не позднее чем за 5 (пять) рабочих дней до начала мероприятия, если иное не согласовано сторонами.</p>
              </section>

              <section>
                <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">4. Права и обязанности сторон</h2>
                <p>4.1. Исполнитель обязуется:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>оказать Услуги надлежащего качества в согласованные сроки;</li>
                  <li>информировать Заказчика о ходе выполнения работ;</li>
                  <li>обеспечить конфиденциальность информации, полученной от Заказчика.</li>
                </ul>
                <p>4.2. Заказчик обязуется:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>своевременно оплатить Услуги в соответствии с условиями настоящей оферты;</li>
                  <li>предоставить Исполнителю всю необходимую информацию для оказания Услуг;</li>
                  <li>принять оказанные Услуги и подписать акт выполненных работ.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">5. Порядок разрешения споров</h2>
                <p>5.1. Все споры и разногласия, возникающие между сторонами, разрешаются путём переговоров.</p>
                <p>5.2. В случае невозможности урегулирования спора путём переговоров спор подлежит рассмотрению в суде по месту регистрации Исполнителя в соответствии с действующим законодательством Российской Федерации.</p>
              </section>

              <section>
                <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">6. Прочие условия</h2>
                <p>6.1. Настоящая оферта вступает в силу с момента её размещения на сайте <a href="https://www.royaleventandmice.com" className="text-royal-pink hover:underline">https://www.royaleventandmice.com</a> и действует до момента её отзыва Исполнителем.</p>
                <p>6.2. Исполнитель оставляет за собой право вносить изменения в условия настоящей оферты без предварительного уведомления Заказчика. Новая редакция оферты вступает в силу с момента её размещения на сайте.</p>
                <p>6.3. По всем вопросам, не урегулированным настоящей офертой, стороны руководствуются действующим законодательством Российской Федерации.</p>
              </section>

              <section>
                <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">7. Реквизиты Исполнителя</h2>
                <p>ИП Усачева Ксения Олеговна<br />
                ИНН: 772206846997<br />
                ОГРНИП: 324774600436282<br />
                Адрес: г. Москва, ул. Шепелюгинская, д. 5, к. 1, кв. 91<br />
                E-mail: <a href="mailto:baxgat@yandex.ru" className="text-royal-pink hover:underline">baxgat@yandex.ru</a></p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">1. General Provisions</h2>
                <p>1.1. This document is an official offer (public offer) of Individual Entrepreneur Usacheva Ksenia Olegovna, INN: 772206846997, OGRNIP: 324774600436282, registered address: Moscow, Shepelyuginskaya st., 5, bldg. 1, apt. 91 (hereinafter — the "Contractor"), addressed to individuals and legal entities (hereinafter — the "Client"), and contains all essential terms for the provision of event organization services.</p>
                <p>1.2. In accordance with paragraph 2 of Article 437 of the Civil Code of the Russian Federation, this document constitutes a public offer, and upon acceptance of the conditions set forth below, the person accepting this offer becomes the Client.</p>
                <p>1.3. Acceptance of this offer is made by paying for the Contractor's services or by filling out and submitting an application form on the website <a href="https://www.royaleventandmice.com" className="text-royal-pink hover:underline">https://www.royaleventandmice.com</a> with a checkbox confirming agreement with the offer terms.</p>
                <p>1.4. Full and unconditional acceptance of this public offer is the Client's payment for the services offered by the Contractor.</p>
              </section>

              <section>
                <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">2. Subject of the Offer</h2>
                <p>2.1. The Contractor undertakes to provide the Client with event organization services (hereinafter — "Services"), and the Client undertakes to pay for these services in the manner and under the conditions provided for by this offer.</p>
                <p>2.2. The name, scope, cost, and timing of the Services are determined based on the Client's application and agreed upon by the parties in an additional agreement (specification), which is an integral part of this contract.</p>
              </section>

              <section>
                <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">3. Cost of Services and Payment Terms</h2>
                <p>3.1. The cost of Services is determined by the Contractor and communicated to the Client by issuing an invoice or commercial proposal.</p>
                <p>3.2. Payment is made in Russian rubles by bank transfer to the Contractor's account.</p>
                <p>3.3. An advance payment of 50% of the Service cost is made by the Client within 5 (five) business days from the date of invoicing. The remaining 50% is paid no later than 5 (five) business days before the event, unless otherwise agreed by the parties.</p>
              </section>

              <section>
                <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">4. Rights and Obligations of the Parties</h2>
                <p>4.1. The Contractor undertakes to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>provide Services of proper quality within agreed timelines;</li>
                  <li>inform the Client about the progress of work;</li>
                  <li>ensure confidentiality of information received from the Client.</li>
                </ul>
                <p>4.2. The Client undertakes to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>timely pay for Services in accordance with the terms of this offer;</li>
                  <li>provide the Contractor with all necessary information for rendering Services;</li>
                  <li>accept the rendered Services and sign the acceptance certificate.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">5. Dispute Resolution</h2>
                <p>5.1. All disputes and disagreements arising between the parties shall be resolved through negotiations.</p>
                <p>5.2. If a dispute cannot be resolved through negotiations, it shall be referred to the court at the Contractor's place of registration in accordance with the current legislation of the Russian Federation.</p>
              </section>

              <section>
                <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">6. Other Terms</h2>
                <p>6.1. This offer comes into force from the moment of its publication on <a href="https://www.royaleventandmice.com" className="text-royal-pink hover:underline">https://www.royaleventandmice.com</a> and remains valid until withdrawn by the Contractor.</p>
                <p>6.2. The Contractor reserves the right to make changes to the terms of this offer without prior notice to the Client. The new version comes into force from the moment of its publication on the website.</p>
                <p>6.3. All matters not regulated by this offer shall be governed by the current legislation of the Russian Federation.</p>
              </section>

              <section>
                <h2 className="text-xl font-display font-bold text-white uppercase tracking-tight mb-4">7. Contractor Details</h2>
                <p>IE Usacheva Ksenia Olegovna<br />
                INN: 772206846997<br />
                OGRNIP: 324774600436282<br />
                Address: Moscow, Shepelyuginskaya st., 5, bldg. 1, apt. 91<br />
                E-mail: <a href="mailto:baxgat@yandex.ru" className="text-royal-pink hover:underline">baxgat@yandex.ru</a></p>
              </section>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Offer;
