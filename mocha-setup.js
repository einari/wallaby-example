(async () => {
    const chai = await import('chai');
    global.expect = chai.expect;
    const should = chai.should();
    global.sinon = await import('sinon');
    await import('reflect-metadata');
    await import('ts-node/register');
    const sinonChai = await import('sinon-chai');
    const chaiAsPromised = await import('chai-as-promised');
    chai.use(sinonChai.default);
    chai.use(chaiAsPromised.default);
})();
