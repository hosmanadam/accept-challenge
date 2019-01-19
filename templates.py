UNITTEST_TEMPLATE = '''\
import unittest

import main


class SampleTests(unittest.TestCase):

    def test1(self):
        pass # TODO: write unit tests


if __name__ == '__main__':
    unittest.main(verbosity=2)
'''


FUNCTION_TEMPLATE = '''\
def foo():
    pass # TODO: implement
'''

REPLACEMENTS = [
    ('test.assert_equals(', 'self.assertEqual(main.')
]